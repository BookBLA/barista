// WebSocketClient.ts
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketClient {
  private static instance: WebSocketClient;
  private client: Client;
  private isConnected: boolean = false;

  private constructor() {
    this.client = new Client({
      webSocketFactory: () => new SockJS('https://dev.bookbla.shop/api/chat/ws/connect'),
      reconnectDelay: 5000,
      onConnect: () => {
        this.isConnected = true;
        console.log('WebSocket successfully connected');
        // 필요한 초기 구독 설정 등 추가 가능
      },
      onDisconnect: () => {
        this.isConnected = false;
        console.log('WebSocket disconnected');
        // 재연결 시도 추가
        this.tryReconnect();
      },
      onStompError: (error) => {
        this.isConnected = false;
        console.error('STOMP error:', error);
        this.tryReconnect();
      },
    });
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  public connect(userId: string, roomId: string, onMessageReceived: (message: any) => void) {
    if (!this.isConnected) {
      this.client.onConnect = () => {
        this.isConnected = true;
        console.log('WebSocket connected');
        this.subscribeToChat(roomId, onMessageReceived);
      };
      this.client.activate();
    } else {
      console.log('WebSocket already connected');
      this.subscribeToChat(roomId, onMessageReceived);
    }
  }

  private tryReconnect() {
    // 재연결을 시도하는 로직 추가
    if (!this.isConnected) {
      console.log('Attempting to reconnect WebSocket...');
      this.client.activate();
    }
  }

  public disconnect() {
    if (this.isConnected) {
      this.client.deactivate();
      this.isConnected = false;
    }
  }

  public sendChatMessage(destination: string, message: any) {
    if (this.isConnected) {
      this.client.publish({ destination, body: JSON.stringify(message) });
      console.log('Message sent:', message);
    } else {
      console.error('Cannot send message, WebSocket is not connected');
      this.tryReconnect(); // 연결 재시도 후 전송 재시도 가능
    }
  }

  public subscribeToChat(roomId: string, callback: (message: any) => void) {
    if (this.isConnected) {
      this.client.subscribe(`/topic/chat/${roomId}`, (message) => {
        callback(JSON.parse(message.body));
      });
    } else {
      console.error('Cannot subscribe, WebSocket is not connected');
    }
  }
}

export default WebSocketClient.getInstance();
