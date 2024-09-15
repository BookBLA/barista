// chat.api.ts
import { Get } from '@commons/configs/axios/http.api';
import axios from 'axios';

export const fetchChatList = async () => {
  try {
    const response = await Get('chat/room');

    console.log('response.data:', response);

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

export const sendMessageToServer = async (message: any) => {
  try {
    const response = await axios.post('chat/send', message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
