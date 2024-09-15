import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { Ref } from 'vue';

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket | null | Ref<WebSocket | null> = null;
  private url: string = 'ws://dev.bookbla.shop/api/chat/ws/connect';
  private isConnected: boolean = false; // 연결 상태 추적

  private constructor() {
    console.log('WebSocketClient constructor');
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  public connect() {
    if (this.isConnected || (this.socket && this.socket.value?.readyState === WebSocket.OPEN)) {
      console.debug('WebSocket is already connected');
      return;
    }

    const token = useAuthStore.getState().token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    if (this.socket && 'value' in this.socket) {
      this.socket.value = new WebSocket(this.url, [], { headers });
    } else {
      this.socket = new WebSocket(this.url, [], { headers });
    }

    const socket = 'value' in this.socket ? this.socket.value : this.socket;

    socket.onopen = () => {
      this.isConnected = true;
      console.debug('WebSocket connection established');
    };

    socket.onmessage = (event) => {
      console.debug('WebSocket message received:', event.data);
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      useErrorMessage.getState().setErrorMessage('WebSocket 연결 오류가 발생했습니다.');
      this.isConnected = false;
    };

    socket.onclose = () => {
      console.debug('WebSocket connection closed');
      this.isConnected = false;
      useErrorMessage.getState().setErrorMessage('WebSocket 연결이 종료되었습니다.');
    };
  }

  public sendMessage(message: any) {
    const socket = 'value' in this.socket ? this.socket.value : this.socket;

    if (socket && socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      socket.send(jsonMessage);
      console.debug('WebSocket message sent:', jsonMessage);
    } else {
      useToastStore.getState().showToast({ content: 'WebSocket 연결이 준비되지 않았습니다.' });
      console.error('WebSocket is not open');
    }
  }

  public disconnect() {
    const socket = 'value' in this.socket ? this.socket.value : this.socket;

    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.close();
      this.isConnected = false;
      this.socket = null;
    } else {
      console.debug('WebSocket is already closed or not initialized');
    }
  }
}

export default WebSocketClient.getInstance();
