// chat.api.ts

import { Get } from '@commons/configs/axios/http.api';

export const fetchChatList = async () => {
  try {
    const response = await Get('chat/room');

    return response;
  } catch (error) {
    console.error('Error fetching chat list:', error);
    throw error;
  }
};

export const fetchChatMessages = async (userId: string, page: number, size: number) => {
  try {
    const response = await Get(`chat?roomId=${userId}&page=${page}&size=${size}`);

    console.log('response.data:', response);

    return response;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

// WebSocket을 사용하여 메시지를 JSON으로 전송하는 함수
export const sendMessageViaWebSocket = (message: any) => {
  try {
    WebSocketClient.sendMessage(message); // WebSocket을 통해 JSON 메시지 전송
    console.log('Message sent via WebSocket:', message);
  } catch (error) {
    console.error('Error sending message via WebSocket:', error);
  }
};
