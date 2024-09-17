// WebSocketClient.ts

class WebSocketClientDirect {
  private static instance: WebSocketClientDirect;
  public socket: WebSocket | null = null;
  private isConnected: boolean = false;
  private memberId: string | null = null;
  private subscriptions: Map<string, () => void> = new Map();

  private constructor() {}

  public static getInstance(): WebSocketClientDirect {
    if (!WebSocketClientDirect.instance) {
      WebSocketClientDirect.instance = new WebSocketClientDirect();
    }
    return WebSocketClientDirect.instance;
  }

  public connect(memberId: string, roomId: string) {
    if (this.isConnected) {
      console.log('WebSocket already connected');
      return;
    }
    this.memberId = memberId;
    const webSocketUrl = `wss://dev.bookbla.shop/api/chat/ws/connect?id=${memberId}`;
    console.log('Attempting to connect to WebSocket at', webSocketUrl);
    this.socket = new WebSocket(webSocketUrl);

    this.socket.onopen = () => {
      this.isConnected = true;
      console.log('WebSocket connection established to', webSocketUrl);
      this.sendMessage({ type: 'AUTH', memberId: this.memberId });

      // WebSocket 연결 후 구독을 시도합니다.
      this.subscribe(roomId, memberId);
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
      this.unsubscribeAll();
      this.socket.close();
      this.isConnected = false;
      console.log('WebSocket manually disconnected');
    }
  };

  public sendMessage = (data: any) => {
    if (this.isConnected && this.socket) {
      const message = JSON.stringify(data);
      try {
        this.socket.send(message);
        console.log('WebSocket message sent:', message);
      } catch (error) {
        console.error('Failed to send WebSocket message:', message, 'Error:', error);
      }
    } else {
      console.error('Cannot send message, WebSocket is not connected. Message data:', data);
    }
  };

  public sendChatMessage = (roomId: string, memberId: string, message: any) => {
    if (!memberId) {
      console.error('Error: memberId is undefined. Cannot send chat message.');
      return;
    }

    if (this.isConnected && this.socket) {
      const endpoint = `/app/chat/${memberId}`;
      const messageData = {
        content: message.text,
        sendId: memberId,
        roomId,
        chatRoomId: roomId,
        sendTime: new Date().toISOString(),
      };

      console.log('Preparing to send chat message to endpoint:', endpoint);
      console.log('Message data:', messageData);

      try {
        this.sendMessage({
          endpoint,
          data: messageData,
        });
        console.log('WebSocket message successfully sent to', endpoint, ':', messageData);
      } catch (error) {
        console.error('Error sending WebSocket message to', endpoint, 'with data:', messageData, 'Error:', error);
      }
    } else {
      console.error(
        'Cannot send message, WebSocket is not connected. Room ID:',
        roomId,
        'Member ID:',
        memberId,
        'Message:',
        message,
      );
    }
  };

  public subscribe(roomId: string, memberId: string) {
    const topic = `/topic/chat/room/${roomId}/${memberId}`;
    if (!this.isConnected || !this.socket) {
      console.error('Cannot subscribe, WebSocket is not connected');
      return;
    }

    if (this.subscriptions.has(topic)) {
      console.log(`Already subscribed to ${topic}`);
      return;
    }

    const subscriptionMessage = {
      type: 'SUBSCRIBE',
      destination: topic,
    };

    this.sendMessage(subscriptionMessage);
    console.log(`Subscribed to ${topic}`);

    this.subscriptions.set(topic, () => this.unsubscribe(topic));
  }

  public unsubscribe(topic: string) {
    if (!this.isConnected || !this.socket || !this.subscriptions.has(topic)) {
      console.error('Cannot unsubscribe, WebSocket is not connected or not subscribed');
      return;
    }

    const unsubscribeMessage = {
      type: 'UNSUBSCRIBE',
      destination: topic,
    };

    this.sendMessage(unsubscribeMessage);
    console.log(`Unsubscribed from ${topic}`);
    this.subscriptions.delete(topic);
  }

  public unsubscribeAll() {
    this.subscriptions.forEach((unsubscribe) => unsubscribe());
    this.subscriptions.clear();
  }
}

export default WebSocketClientDirect.getInstance();
