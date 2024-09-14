// chat.api.ts
import axios from 'axios';

export const fetchChatList = async () => {
  try {
    const response = await axios.get('/api/chat/list');
    return response.data;
  } catch (error) {
    console.error('Error fetching chat list:', error);
    throw error;
  }
};

export const fetchChatMessages = async (userId: string, page: number, size: number) => {
  try {
    const response = await axios.get(`/api/chat?roomId=${userId}&page=${page}&size=${size}`);

    console.log('response.data:', response.data);

    return response.data;
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    throw error;
  }
};

export const sendMessageToServer = async (message: any) => {
  try {
    const response = await axios.post('/api/chat/send', message);
    return response.data;
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};
