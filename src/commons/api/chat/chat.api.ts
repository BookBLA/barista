// @commons/api/chat/chat.api.ts

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

// 더미 데이터 생성 함수
const generateDummyMessages = (count) => {
  const messages = [];
  for (let i = count; i > 0; i--) {
    messages.push({
      id: `${i}`,
      text: `더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}더미 메시지 ${i}`,
      sender: i % 2 === 0 ? 'user' : 'partner', // 짝수는 'user', 홀수는 'partner'
      timestamp: new Date(Date.now() - i * 60000).toISOString(), // i분 전 시간 설정
    });
  }
  return messages;
};

// fetchChatMessages 함수 수정
export const fetchChatMessages = async (roomId: string, page: number, size: number) => {
  try {
    // 실제 API 요청 부분
    const response = await Get(`chat?roomId=${roomId}&page=${page}&size=${size}`);

    return response;
  } catch (error) {
    console.error('Error fetching chat messages:', error);

    // 오류 발생 시 더미 데이터 반환
    const dummyResponse = {
      isSuccess: true,
      result: {
        content: generateDummyMessages(3), // 50개의 더미 메시지 생성
        empty: false,
      },
    };

    return dummyResponse;
  }
};

export const switchAlert = async (roomId: string, isAlert: boolean) => {
  try {
    const response = await Post(`chat/room/alert?isAlert=${isAlert}&roomId=${roomId}`);

    return response;
  } catch (error) {
    console.error('Error switching alert:', error);
    throw error;
  }
};

// WebSocket을 사용하여 메시지를 JSON으로 전송하는 함수
export const sendMessageViaWebSocket = (message: any) => {
  try {
    WebSocketClient.sendMessage(message); // WebSocket을 통해 JSON 메시지 전송
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
