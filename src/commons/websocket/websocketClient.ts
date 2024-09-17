// @commons/websocket/websocketClient.ts

import AsyncStorage from '@react-native-async-storage/async-storage';
import { Client, IMessage } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

class WebSocketClient {
  private static instance: WebSocketClient;
  private client: Client;
  private url: string; // 연결 URL을 동적으로 설정하기 위해 필드 추가
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000; // 3 seconds
  private memberId: string = '';
  private roomId: string = '';

  private constructor() {
    // STOMP 클라이언트 설정
    this.client = new Client({
      webSocketFactory: () => new SockJS(this.url), // SockJS를 사용하여 WebSocket을 생성
      debug: (str) => console.log(`[STOMP DEBUG] ${str}`),
      reconnectDelay: this.reconnectInterval,
      onConnect: (frame) => this.handleConnect(frame),
      onStompError: (frame) => this.handleStompError(frame),
      onDisconnect: () => this.handleDisconnect(),
    });
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  public async connect(memberID: string, roomID: string): Promise<void> {
    console.log('[WebSocketClient] Attempting to connect');

    if (this.isConnected) {
      console.warn('[WebSocketClient] Already connected, aborting connection attempt');
      return;
    }

    this.memberId = memberID;
    this.roomId = roomID;
    this.url = `wss://dev.bookbla.shop/api/chat/ws/connect?id=${this.memberId}`; // wss로 수정하여 URL 설정

    const token = await this.getAuthToken();
    console.log('[WebSocketClient] Token available:', !!token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    // 헤더 설정
    this.client.connectHeaders = headers;
    this.client.activate(); // STOMP 클라이언트 활성화
  }

  private async getAuthToken(): Promise<string | null> {
    try {
      const token = await AsyncStorage.getItem('authToken');
      return token;
    } catch (error) {
      console.error('[WebSocketClient] Error retrieving auth token:', error);
      return null;
    }
  }

  private handleConnect(frame: any): void {
    console.log('[WebSocketClient] Connected via STOMP:', frame);
    this.isConnected = true;
    this.reconnectAttempts = 0;

    // 연결이 완료된 후에 구독 설정
    this.subscribeToChat();
    this.subscribeToChatRoom();
  }

  private subscribeToChat(): void {
    if (!this.isConnected) {
      console.error('[WebSocketClient] Cannot subscribe, STOMP client is not connected');
      return;
    }

    const chatUrl = `/topic/chat/${this.memberId}`; // 채팅 구독 URL
    this.client.subscribe(chatUrl, (message: IMessage) => this.handleMessage(message));
    console.log(`[WebSocketClient] Subscribed to ${chatUrl}`);
  }

  private subscribeToChatRoom(): void {
    if (!this.isConnected) {
      console.error('[WebSocketClient] Cannot subscribe, STOMP client is not connected');
      return;
    }

    const roomUrl = `/topic/chat/room/${this.roomId}/${this.memberId}`; // 채팅방 구독 URL
    this.client.subscribe(roomUrl, (message: IMessage) => this.handleMessage(message));
    console.log(`[WebSocketClient] Subscribed to ${roomUrl}`);
  }

  private handleMessage(message: IMessage): void {
    console.log('[WebSocketClient] Message received:', message.body);

    try {
      const parsedData = JSON.parse(message.body);
      console.log('[WebSocketClient] Parsed message:', parsedData);
    } catch (error) {
      console.error('[WebSocketClient] Error parsing message:', error);
    }
  }

  private handleStompError(frame: any): void {
    console.error('[WebSocketClient] STOMP error:', frame);
    this.isConnected = false;
    this.attemptReconnect();
  }

  private handleDisconnect(): void {
    console.log('[WebSocketClient] Disconnected');
    this.isConnected = false;
    this.attemptReconnect();
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`[WebSocketClient] Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.client.activate(), this.reconnectInterval);
    } else {
      console.error('[WebSocketClient] Max reconnect attempts reached');
    }
  }

  public sendChatMessage(destination: string, message: any): void {
    if (!this.isConnected) {
      console.error('[WebSocketClient] Cannot send message, STOMP client is not connected');
      return;
    }

    this.client.publish({
      destination,
      body: JSON.stringify(message),
    });
    console.log(`[WebSocketClient] Sent message to ${destination}:`, message);
  }

  public disconnect(): void {
    if (this.client.active) {
      this.client.deactivate();
      console.log('[WebSocketClient] Disconnected');
    }
  }
}

export default WebSocketClient.getInstance();
