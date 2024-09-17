// @commons/websocket/websocketClient.ts

import { Client, StompConfig, StompSubscription } from '@stomp/stompjs';
import { TextDecoder, TextEncoder } from 'text-encoding'; // text-encoding 라이브러리 임포트

class WebSocketClientDirect {
  private static instance: WebSocketClientDirect;
  private stompClient: Client | null = null;
  private isConnected: boolean = false;
  private stompConnected: boolean = false;
  private memberId: string | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  private constructor() {}

  public static getInstance(): WebSocketClientDirect {
    if (!WebSocketClientDirect.instance) {
      WebSocketClientDirect.instance = new WebSocketClientDirect();
    }
    return WebSocketClientDirect.instance;
  }

  public connect(memberId: string, roomId: string) {
    if (this.isConnected) {
      console.log('STOMP already connected');
      return;
    }

    this.memberId = memberId;

    const stompConfig: StompConfig = {
      brokerURL: `wss://dev.bookbla.shop/api/chat/ws/connect?id=${memberId}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {
        // 필요한 경우 헤더 추가
      },
      onConnect: (frame) => {
        console.log('STOMP connection established:', frame);
        this.isConnected = true;
        this.stompConnected = true;
        this.sendMessage({ type: 'AUTH', memberId: this.memberId });
        this.subscribe(roomId, memberId, () => {}); // 초기 구독 처리
      },
      onStompError: (frame) => {
        console.error('STOMP error: Broker reported error:', frame.headers['message']);
        console.error('STOMP error: Additional details:', frame.body);
      },
      onWebSocketClose: (event) => {
        console.log(`WebSocket closed: code=${event.code}, reason=${event.reason}`);
        this.isConnected = false;
        this.stompConnected = false;
        this.tryReconnect();
      },
      onWebSocketError: (error) => {
        console.error('WebSocket error occurred:', error);
        this.tryReconnect();
      },
      debug: (str) => {
        console.log('STOMP debug:', str);
      },
    };

    this.stompClient = new Client(stompConfig);

    // WebSocket 상태를 확인하기 위해 핸들러 추가
    this.stompClient.webSocketFactory = () => {
      const ws = new WebSocket(stompConfig.brokerURL!);
      ws.onopen = () => console.log('WebSocket connection opened.');
      ws.onerror = (error) => console.error('WebSocket encountered error:', error);
      ws.onclose = (event) => console.log('WebSocket closed:', event);
      return ws;
    };

    this.stompClient.activate();
  }

  private tryReconnect = () => {
    if (!this.isConnected && this.memberId) {
      console.log('Attempting to reconnect STOMP...');
      this.unsubscribeAll();
      setTimeout(() => this.connect(this.memberId!, ''), 5000);
    }
  };

  public disconnect = () => {
    if (this.isConnected && this.stompClient) {
      this.unsubscribeAll();
      this.stompClient.deactivate();
      this.isConnected = false;
      this.stompConnected = false;
      console.log('STOMP connection manually disconnected');
    }
  };

  public sendMessage = (endpoint: string, data: any) => {
    if (this.isConnected && this.stompConnected && this.stompClient) {
      const message = JSON.stringify(data);
      try {
        const encodedMessage = new TextEncoder().encode(message); // 메시지 인코딩
        this.stompClient.publish({ destination: endpoint, body: message });
        console.log('STOMP message sent:', message);
      } catch (error) {
        console.error('Failed to send STOMP message:', message, 'Error:', error);
      }
    } else {
      console.error('Cannot send message, STOMP is not connected. Message data:', data);
    }
  };

  public sendChatMessage = (roomId: string, memberId: string, message: any) => {
    if (!memberId) {
      console.error('Error: memberId is undefined. Cannot send chat message.');
      return;
    }

    if (this.isConnected && this.stompConnected && this.stompClient) {
      const endpoint = `/app/chat/${memberId}`;
      const messageData = {
        content: message.text,
        senderId: parseInt(memberId),
        chatRoomId: parseInt(roomId),
        sendTime: new Date().toISOString(),
      };

      console.log('Preparing to send chat message to endpoint:', endpoint);
      console.log('Message data:', messageData);

      try {
        this.sendMessage(endpoint, messageData);
      } catch (error) {
        console.error('Error sending STOMP message to', endpoint, 'with data:', messageData, 'Error:', error);
      }
    } else {
      console.error(
        'Cannot send message, STOMP is not connected. Room ID:',
        roomId,
        'Member ID:',
        memberId,
        'Message:',
        message,
      );
    }
  };

  public subscribe(roomId: string, memberId: string, handleNewMessage: (message: any) => void) {
    const topic = `/topic/chat/${memberId}`;
    if (!this.isConnected || !this.stompConnected || !this.stompClient) {
      console.error('Cannot subscribe, STOMP is not connected');
      return;
    }

    if (this.subscriptions.has(topic)) {
      console.log(`Already subscribed to ${topic}`);
      return;
    }

    const subscription = this.stompClient.subscribe(topic, (message) => {
      const decodedMessage = new TextDecoder().decode(new Uint8Array(message.binaryBody)); // 메시지 디코딩
      console.log('STOMP message received:', decodedMessage);
      this.handleIncomingMessage(decodedMessage, handleNewMessage); // 메시지 핸들링 콜백 호출
    });

    this.subscriptions.set(topic, subscription);
    console.log(`Subscribed to ${topic}`);
  }

  private handleIncomingMessage = (data: string, handleNewMessage: (message: any) => void) => {
    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed message data:', parsedData);
      handleNewMessage(parsedData); // 수신된 메시지를 전달
    } catch (error) {
      console.error('Failed to parse incoming message:', error);
    }
  };

  public unsubscribe(topic: string) {
    if (!this.isConnected || !this.stompConnected || !this.stompClient || !this.subscriptions.has(topic)) {
      console.error('Cannot unsubscribe, STOMP is not connected or not subscribed');
      return;
    }

    const subscription = this.subscriptions.get(topic);
    if (subscription) {
      subscription.unsubscribe();
      console.log(`Unsubscribed from ${topic}`);
      this.subscriptions.delete(topic);
    }
  }

  public unsubscribeAll() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions.clear();
  }
}

export default WebSocketClientDirect.getInstance();
