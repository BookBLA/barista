// websocketClient.ts

import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket | null = null;
  private url: string = process.env.EXPO_PUBLIC_WEBSOCKET_URL || 'ws://서버주소/api/chat/send';

  private constructor() {
    this.connect();
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  private connect() {
    if (!this.url.startsWith('ws://') && !this.url.startsWith('wss://')) {
      this.url = `ws://${this.url}`;
    }

    const token = useAuthStore.getState().token;
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    this.socket = new WebSocket(this.url, [], { headers });

    this.socket.onopen = () => {
      console.debug('WebSocket connection established');
    };

    this.socket.onmessage = (event) => {
      console.debug('WebSocket message received:', event.data);
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error:', error);
      useErrorMessage.getState().setErrorMessage('WebSocket 연결 오류가 발생했습니다.');
    };

    this.socket.onclose = () => {
      console.debug('WebSocket connection closed');
      useErrorMessage.getState().setErrorMessage('WebSocket 연결이 종료되었습니다.');
    };
  }

  public sendMessage(message: any) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      const jsonMessage = JSON.stringify(message); // 메시지를 JSON 형식으로 직렬화
      this.socket.send(jsonMessage);
      console.debug('WebSocket message sent:', jsonMessage);
    } else {
      useToastStore.getState().showToast({ content: 'WebSocket 연결이 준비되지 않았습니다.' });
      console.error('WebSocket is not open');
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}

export default WebSocketClient.getInstance();
