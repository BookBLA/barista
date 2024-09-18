// @commons/websocket/websocketClient.ts

import { Client, StompConfig, StompSubscription } from '@stomp/stompjs';
import { TextEncoder } from 'text-encoding'; // text-encoding 라이브러리 임포트

type SendMessageStatusCallback = (messageId: string, status: 'sent' | 'failed') => void;

class WebSocketClientDirect {
  private static instance: WebSocketClientDirect;
  private stompClient: Client | null = null;
  private isConnected: boolean = false;
  private stompConnected: boolean = false;
  private memberId: string | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  // Array to hold registered callbacks
  private sendMessageStatusCallbacks: SendMessageStatusCallback[] = [];

  private constructor() {}

  public static getInstance(): WebSocketClientDirect {
    if (!WebSocketClientDirect.instance) {
      WebSocketClientDirect.instance = new WebSocketClientDirect();
    }
    return WebSocketClientDirect.instance;
  }

  // Method to register callbacks
  public onSendMessageStatus(callback: SendMessageStatusCallback) {
    this.sendMessageStatusCallbacks.push(callback);
  }

  private emitSendMessageStatus(messageId: string, status: 'sent' | 'failed') {
    console.log(`emitSendMessageStatus called with messageId: ${messageId}, status: ${status}`);
    this.sendMessageStatusCallbacks.forEach((callback) => callback(messageId, status));
  }

  public connect(memberId: string, roomId: string) {
    if (this.stompConnected) {
      console.log('STOMP already connected');
      return;
    }

    this.memberId = memberId;

    const stompConfig: StompConfig = {
      brokerURL: `wss://dev.bookbla.shop/api/chat/ws/connect?id=${memberId}`,
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
      connectHeaders: {},
      onConnect: (frame) => {
        console.log('STOMP connection established:', frame);
        this.isConnected = true;
        this.stompConnected = true;
        this.subscribe(roomId, memberId, this.handleNewMessage.bind(this));
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

  public sendMessage = (endpoint: string, data: any, messageId: string) => {
    if (this.isConnected && this.stompConnected && this.stompClient) {
      const message = JSON.stringify(data);
      try {
        const encodedMessage = new TextEncoder().encode(message); // 메시지 인코딩
        this.stompClient.publish({ destination: endpoint, body: message });
        console.log('STOMP message sent:', message);

        // Do not emit 'sent' here. Wait for server acknowledgment.
        this.emitSendMessageStatus(messageId, 'sent');
      } catch (error) {
        console.error('Failed to send STOMP message:', message, 'Error:', error);
        // Emit 'failed' status if sending fails
        this.emitSendMessageStatus(messageId, 'failed');
      }
    } else {
      console.error('Cannot send message, STOMP is not connected. Message data:', data);
      // Emit 'failed' status if not connected
      this.emitSendMessageStatus(data.id, 'failed'); // Ensure data has 'id'
    }
  };

  public sendChatMessage = (roomId: string, memberId: string, message: any, messageId: string) => {
    if (!memberId) {
      console.error('Error: memberId is undefined. Cannot send chat message.');
      return;
    }

    if (this.isConnected && this.stompConnected && this.stompClient) {
      const endpoint = `/app/chat/${roomId}`; // roomId 사용
      const messageData = {
        content: message.text,
        senderId: parseInt(memberId),
        chatRoomId: parseInt(roomId),
        sendTime: new Date().toISOString(),
        id: messageId, // Include the messageId for tracking
      };

      console.log('Preparing to send chat message to endpoint:', endpoint);
      console.log('Message data:', messageData);

      try {
        this.sendMessage(endpoint, messageData, messageId);
      } catch (error) {
        console.error('Error sending STOMP message to', endpoint, 'with data:', messageData, 'Error:', error);
        this.emitSendMessageStatus(messageId, 'failed');
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
      // Emit 'failed' status if not connected
      this.emitSendMessageStatus(message.id, 'failed'); // Ensure message has 'id'
    }
  };

  public subscribe(roomId: string, memberId: string, handleNewMessage: (message: any) => void, topic: string) {
    if (!this.isConnected || !this.stompConnected || !this.stompClient) {
      console.error('Cannot subscribe, STOMP is not connected');
      return;
    }

    if (this.subscriptions.has(topic)) {
      console.log(`Already subscribed to ${topic}`);
      return;
    }

    const subscription = this.stompClient.subscribe(topic, (message) => {
      const decodedMessage = message.body;
      console.log('STOMP message received:', decodedMessage);
      const parsedMessage = JSON.parse(decodedMessage);

      // Acknowledgement message check
      if ('status' in parsedMessage && 'id' in parsedMessage) {
        const status = parsedMessage.status === 'SUCCESS' ? 'sent' : 'failed';
        this.emitSendMessageStatus(parsedMessage.id, status);
      } else {
        // Log message to check if handleNewMessage is being called
        console.log('Calling handleNewMessage with:', parsedMessage);
        handleNewMessage(parsedMessage);
      }
    });

    this.subscriptions.set(topic, subscription);
    console.log(`Subscribed to ${topic}`);
  }

  private handleIncomingMessage = (data: string, handleNewMessage: (message: any) => void) => {
    try {
      const parsedData = JSON.parse(data);
      console.log('Parsed message data:', parsedData);
      handleNewMessage(parsedData);
    } catch (error) {
      console.error('Failed to parse incoming message:', error);
    }
  };

  public publishConnectionStatus = (roomId: string, memberId: string, status: boolean) => {
    if (!this.isConnected || !this.stompConnected || !this.stompClient) {
      console.error('Cannot publish message, STOMP is not connected');
      return;
    }

    // PUBLISH를 할 토픽 엔드포인트 설정
    const endpoint = `/topic/chat/room/${roomId}/${memberId}`;
    const messageData = {
      memberId: 1,
      status: status ? 'CONNECTED' : 'DISCONNECTED',
    };

    console.log('Publishing message to endpoint:', endpoint);
    console.log('Message data:', messageData);

    try {
      // sendMessage 메서드를 사용하여 PUBLISH 실행
      this.sendMessage(endpoint, messageData, `status-${Date.now()}`);
    } catch (error) {
      console.error('Error publishing message to', endpoint, 'with data:', messageData, 'Error:', error);
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
