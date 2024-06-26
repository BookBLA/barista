import axios from 'axios';
import { useErrorMessage } from '../store/useErrorMessage';
import useAuthStore from '../store/useAuthStore';
import useToastStore from '../store/useToastStore';
import * as Device from 'expo-device';
import { getAppVersion } from './getAppVersion';

export const httpApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

const appVersion = getAppVersion();

httpApi.interceptors.request.use(async (request) => {
  console.debug('headers: ', request.headers);
  console.debug('url: ', request.url);
  console.debug('params: ', request.params);
  console.debug('body: ', request.data);
  return request;
});

httpApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    const systemName = Device.osName;
    const osVersion = Device.osVersion;
    config.headers['x-device-type'] = systemName === 'iOS' ? 'ios' : 'android';
    config.headers['x-os-version'] = osVersion;
    config.headers['x-app-version'] = appVersion;

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

httpApi.interceptors.response.use(
  (response) => {
    console.debug(response.status);
    console.debug(response.data);
    return response;
  },
  async (error) => {
    console.debug(error.response.status);
    console.debug(error.response.data);
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        useErrorMessage.getState().setErrorMessage('일주일이 경과되어 자동 로그아웃 되었습니다.');
        return useAuthStore.getState().removeToken();
      } catch (error) {
        return Promise.reject(error);
      }
    }
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
  code: string;
  isSuccess: boolean;
  result: T;
}

const handleError = (error: unknown, showToast: boolean) => {
  if (axios.isAxiosError(error)) {
    if (showToast) {
      useToastStore.getState().showToast({ content: error.message });
    }
    return Promise.reject(error);
  }
};

export const Get = async (url: string, params = {}, showToast: boolean = false) => {
  try {
    const response = await httpApi.get(url, {
      ...config,
      ...params,
    });
    return response.data;
  } catch (error) {
    return handleError(error, showToast);
  }
};

export const Post = async <D>(url: string, data?: D, showToast: boolean = false) => {
  try {
    const response = await httpApi.post(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error, showToast);
  }
};

export const Put = async <D>(url: string, data?: D, showToast: boolean = false) => {
  try {
    const response = await httpApi.put(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error, showToast);
  }
};

export const Delete = async (url: string, showToast: boolean = false) => {
  try {
    const response = await httpApi.delete(url, config);
    return response.data;
  } catch (error) {
    return handleError(error, showToast);
  }
};

export const Patch = async <D>(url: string, data?: D, showToast: boolean = false) => {
  try {
    const response = await httpApi.patch(url, data, config);
    return response.data;
  } catch (error) {
    return handleError(error, showToast);
  }
};
