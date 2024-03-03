import axios from 'axios';
import { useErrorMessage } from '../store/useErrorMessage';

export const httpApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

const config = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};

export const Get = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await httpApi.get<T>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useErrorMessage.getState().setErrorMessage(error.message);
    }
    return undefined;
  }
};

export const Post = async <T, D>(url: string, data?: D): Promise<T | undefined> => {
  try {
    const response = await httpApi.post<T>(url, data, config);
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      useErrorMessage.getState().setErrorMessage(error.message);
    }
    return undefined;
  }
};

export const Put = async <T, D>(url: string, data?: D): Promise<T | undefined> => {
  try {
    const response = await httpApi.put<T>(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useErrorMessage.getState().setErrorMessage(error.message);
    }
    return undefined;
  }
};

export const Delete = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await httpApi.delete<T>(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      useErrorMessage.getState().setErrorMessage(error.message);
    }
    return undefined;
  }
};

// const handleResponse = <T>(response: AxiosResponse<T>): ApiResponse<T> => {
//   return response;
// };

// const handleError = <T>(error: unknown): ApiResponse<T> => {
//   let message = 'An unknown error occurred';
//   if (error instanceof Error) {
//     message = error.message;
//   }
//   useErrorMessage.getState().setErrorMessage(message);

//   return error;
// };
