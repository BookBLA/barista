// @commons/websocket/websocketClient.ts

class WebSocketClientDirect {
  private static instance: WebSocketClientDirect;
  public socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private memberId: string | null = null;

  private constructor() {}

  public static getInstance(): WebSocketClientDirect {
    if (!WebSocketClientDirect.instance) {
      WebSocketClientDirect.instance = new WebSocketClientDirect();
    }
    return WebSocketClientDirect.instance;
  }

  public connect(memberId: string) {
    if (this.isConnected) {
      console.log('WebSocket already connected');
      return;
    }
    this.memberId = memberId;
    const webSocketUrl = `wss://dev.bookbla.shop/api/chat/ws/connect`;
    console.log('Attempting to connect to WebSocket at', webSocketUrl);
    this.socket = new WebSocket(webSocketUrl);

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('WebSocket connection established to', webSocketUrl);
      // Send authentication message after connection is established
      this.sendMessage({ type: 'AUTH', memberId: this.memberId });
    };

    this.socket.onerror = (error) => {
      console.error('WebSocket error occurred:', error);
    };

    this.socket.onclose = (event) => {
      this.isConnected = false;
      console.log('WebSocket connection closed:', event.reason);
      this.tryReconnect();
    };

    this.socket.onmessage = (message) => {
      console.log('WebSocket message received:', message.data);
      this.handleIncomingMessage(message.data);
    };
  }

  private handleIncomingMessage = (data: string) => {
    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed message data:', parsedData);
    } catch (error) {
      console.error('Failed to parse incoming message:', error);
    }
  };

  private tryReconnect = () => {
    if (!this.isConnected && this.memberId) {
      console.log('Attempting to reconnect WebSocket...');
      setTimeout(() => this.connect(this.memberId!), 5000); // Reconnect after 5 seconds
    }
  };

  public disconnect = () => {
    if (this.isConnected && this.socket) {
      this.socket.close();
      this.isConnected = false;
      console.log('WebSocket manually disconnected');
    }
  };

  // sendMessage를 화살표 함수로 정의하여 this 컨텍스트 문제 해결
  public sendMessage = (data: any) => {
    if (this.isConnected && this.socket) {
      const message = JSON.stringify(data);
      this.socket.send(message);
      console.log('WebSocket message sent:', message);
    } else {
      console.error('Cannot send message, WebSocket is not connected');
    }
  };

  public sendChatMessage = (roomId: string, memberId: string, message: any) => {
    if (!memberId) {
      console.error('Error: memberId is undefined. Cannot send chat message.');
      return;
    }

    if (this.isConnected && this.socket) {
      const endpoint = `/app/chat/${roomId}/${memberId}`;
      const messageData = {
        type: 'CHAT',
        content: message.text,
        sender: memberId,
        timestamp: new Date().toISOString(),
      };

      // sendMessage 호출 시 this가 올바르게 참조되도록 설정
      this.sendMessage({
        endpoint,
        data: messageData,
      });

      console.log('WebSocket message sent to', endpoint, ':', messageData);
    } else {
      console.error('Cannot send message, WebSocket is not connected');
    }
  };
}

export default WebSocketClientDirect.getInstance();
