import AsyncStorage from '@react-native-async-storage/async-storage';

class WebSocketClient {
  private static instance: WebSocketClient;
  private socket: WebSocket | null = null;
  private url: string = 'wss://dev.bookbla.shop/api/chat/ws/connect?id='; // WebSocket 연결 주소
  private isConnected: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;
  private reconnectInterval: number = 3000; // 3 seconds
  private closeCode: number | null = null;
  private closeReason: string | null = null;

  private constructor() {
    console.log('[WebSocketClient] Constructor called');
  }

  public static getInstance(): WebSocketClient {
    if (!WebSocketClient.instance) {
      console.log('[WebSocketClient] Creating new instance');
      WebSocketClient.instance = new WebSocketClient();
    }
    return WebSocketClient.instance;
  }

  public async connect(memberID: string, roomID: string): Promise<void> {
    console.log('[WebSocketClient] Attempting to connect');

    console.log(`memberID: ${memberID}, roomID: ${roomID}`);

    if (this.isConnected) {
      console.warn('[WebSocketClient] Already connected, aborting connection attempt');
      return;
    }

    const token = await this.getAuthToken();
    console.log('[WebSocketClient] Token available:', !!token);
    const headers = token ? { Authorization: `Bearer ${token}` } : {};

    try {
      this.socket = new WebSocket(`${this.url}${memberID}`, [], { headers });
      console.log('[WebSocketClient] WebSocket instance created');
    } catch (error) {
      console.error('[WebSocketClient] Error creating WebSocket:', error);
      this.handleError(new Event('WebSocket 생성 중 오류가 발생했습니다.'));
      return;
    }

    this.socket.onopen = (event) => this.handleOpen(event, memberID, roomID);
    this.socket.onmessage = this.handleMessage.bind(this);
    this.socket.onerror = this.handleError.bind(this);
    this.socket.onclose = (event) => this.handleClose(event, memberID, roomID);

    console.log('[WebSocketClient] WebSocket event handlers set up');
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

  private handleOpen(event: Event, memberID: string, roomID: string): void {
    console.log('[WebSocketClient] Connection opened', event);
    this.isConnected = true;
    this.reconnectAttempts = 0;
    this.closeCode = null;
    this.closeReason = null;
    this.showToast('WebSocket 연결이 설정되었습니다.');

    // 채팅 및 채팅방 구독
    this.subscribeToChat(memberID);
    if (roomID) {
      this.enterChatRoom(roomID, memberID);
    }
  }

  private subscribeToChat(memberID: string): void {
    // 특정 사용자 채팅 구독
    const subscribeMessage = {
      type: 'SUBSCRIBE',
      destination: `/topic/chat/${memberID}`,
    };

    this.sendMessage(subscribeMessage);
    console.log(`[WebSocketClient] Subscribed to /topic/chat/${memberID}`);
  }

  private enterChatRoom(roomID: string, memberID: string): void {
    // 특정 채팅방 구독
    const roomSubscribeMessage = {
      type: 'SUBSCRIBE',
      destination: `/topic/chat/room/${roomID}/${memberID}`,
    };

    this.sendMessage(roomSubscribeMessage);
    console.log(`[WebSocketClient] Subscribed to /topic/chat/room/${roomID}/${memberID}`);
  }

  private handleMessage(event: MessageEvent): void {
    console.log('[WebSocketClient] Message received:', event.data);
    try {
      const parsedData = JSON.parse(event.data);
      console.log('[WebSocketClient] Parsed message:', parsedData);
      // 메시지 처리 로직 추가
    } catch (error) {
      console.error('[WebSocketClient] Error parsing message:', error);
    }
  }

  private handleError(error: Event): void {
    console.error('[WebSocketClient] Error occurred:', error);
    this.setErrorMessage('WebSocket 연결 오류가 발생했습니다.');
    if (this.socket && (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING)) {
      this.socket.close();
    }
  }

  private handleClose(event: CloseEvent, memberID: string, roomID: string): void {
    console.log('[WebSocketClient] Connection closed', event);
    this.isConnected = false;
    this.closeCode = event.code || null;
    this.closeReason = event.reason || null;
    this.setErrorMessage(`WebSocket 연결이 종료되었습니다. (Code: ${event.code}, Reason: ${event.reason})`);
    this.attemptReconnect(memberID, roomID);
  }

  private attemptReconnect(memberID: string, roomID: string): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`[WebSocketClient] Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`);
      setTimeout(() => this.connect(memberID, roomID), this.reconnectInterval);
    } else {
      console.error('[WebSocketClient] Max reconnect attempts reached');
      this.showToast('WebSocket 재연결 시도 횟수를 초과했습니다.');
      this.reconnectAttempts = 0;
    }
  }

  public sendChatMessage(memberID: string, message: any): void {
    // 채팅 메시지 전송
    const sendMessage = {
      type: 'SEND',
      destination: `/app/chat/${memberID}`, // 채팅 전송 경로
      payload: message, // 실제 전송할 메시지 내용
    };

    this.sendMessage(sendMessage);
    console.log(`[WebSocketClient] Sent message to /app/chat/${memberID}:`, message);
  }

  private sendMessage(message: any): void {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      try {
        const jsonMessage = JSON.stringify(message);
        this.socket.send(jsonMessage);
        console.log('[WebSocketClient] Message sent:', jsonMessage);
      } catch (error) {
        console.error('[WebSocketClient] Error sending message:', error);
        this.showToast('메시지 전송 중 오류가 발생했습니다.');
      }
    } else {
      console.error('[WebSocketClient] WebSocket is not open. ReadyState:', this.socket?.readyState);
      this.showToast('WebSocket 연결이 준비되지 않았습니다.');
    }
  }

  public disconnect(): void {
    console.log('[WebSocketClient] Disconnecting');
    if (this.socket) {
      if (this.socket.readyState === WebSocket.OPEN || this.socket.readyState === WebSocket.CONNECTING) {
        this.socket.close();
      }
      this.isConnected = false;
      this.socket = null;
      console.log('[WebSocketClient] Disconnected');
    } else {
      console.warn('[WebSocketClient] No active connection to disconnect');
    }
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public getLastCloseInfo(): { code: number | null; reason: string | null } {
    return { code: this.closeCode, reason: this.closeReason };
  }

  private setErrorMessage(message: string): void {
    console.error('[WebSocketClient] Error:', message);
    // 에러 메시지를 저장하거나 표시하는 로직을 추가하세요.
  }

  private showToast(message: string): void {
    console.log('[WebSocketClient] Toast:', message);
    // 토스트 메시지를 표시하는 로직을 추가하세요.
  }
}

export default WebSocketClient.getInstance();
