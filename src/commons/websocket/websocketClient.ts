import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket | null = null;
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
    if (this.isConnected || this.socket?.readyState === WebSocket.OPEN) {
      console.debug('WebSocket is already connected');
      return;
    }

    const token = useAuthStore.getState().token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    this.socket = new WebSocket(this.url, [], { headers });

    this.socket.onopen = () => {
      this.isConnected = true;
      console.debug('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.debug('WebSocket message received:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      useErrorMessage.getState().setErrorMessage('WebSocket 연결 오류가 발생했습니다.');
      this.isConnected = false;
    };

    this.socket.onclose = () => {
      console.debug('WebSocket connection closed');
      this.isConnected = false;
      useErrorMessage.getState().setErrorMessage('WebSocket 연결이 종료되었습니다.');
    };
  }

  public sendMessage(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message);
      this.socket.send(jsonMessage);
      console.debug('WebSocket message sent:', jsonMessage);
    } else {
      useToastStore.getState().showToast({ content: 'WebSocket 연결이 준비되지 않았습니다.' });
      console.error('WebSocket is not open');
    }
  }

  public disconnect() {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.close();
      this.isConnected = false;
      this.socket = null;
    } else {
      console.debug('WebSocket is already closed or not initialized');
    }
  }
}

export default WebSocketClient.getInstance();
