import axios from 'axios';
import { useErrorMessage } from '../store/useErrorMessage';
import useAuthStore from '../store/useAuthStore';

export const httpApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

httpApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const config = {
  headers: {
    'Content-Type': 'application/json',
    accept: 'application/json',
  },
};

export interface ResponseData<T> {
  code: number;
  isSuccess: boolean;
  result: T;
}

export const Get = async (url: string, showModal: boolean = false) => {
  try {
    const response = await httpApi.get(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (showModal) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
      return Promise.reject(error.message);
    }
  }
};

export const Post = async <D>(url: string, data?: D, showModal: boolean = false) => {
  try {
    const response = await httpApi.post(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (showModal) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
      return Promise.reject(error.message);
    }
  }
};

export const Put = async <D>(url: string, data?: D, showModal: boolean = false) => {
  try {
    const response = await httpApi.put(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (showModal) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
      return Promise.reject(error.message);
    }
  }
};

export const Delete = async (url: string, showModal: boolean = false) => {
  try {
    const response = await httpApi.delete(url, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (showModal) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
      return Promise.reject(error.message);
    }
  }
};

export const Patch = async <D>(url: string, data?: D, showModal: boolean = false) => {
  try {
    const response = await httpApi.patch(url, data, config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (showModal) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
      return Promise.reject(error.message);
    }
  }
};
