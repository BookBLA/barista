// chat.api.ts

import { Get, Post } from '@commons/configs/axios/http.api';

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

    console.log('Chat messages fetched:', JSON.parse(JSON.stringify(response)));

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

// Post chat/room/exit?roomId={roomId}
export const exitChatRoom = async (roomId: string) => {
  try {
    const response = await Post(`chat/room/exit?roomId=${roomId}`);

    return response;
  } catch (error) {
    console.error('Error exiting chat room:', error);
    throw error;
  }
};

// post chat/room/alert?roomId={roomId}&is_alert={is_alert}
export const alertChatRoom = async (roomId: string, isAlert: boolean) => {
  try {
    const response = await Post(`chat/room/alert?roomId=${roomId}&is_alert=${isAlert}`);

    return response;
  } catch (error) {
    console.error('Error alerting chat room:', error);
    throw error;
  }
};
