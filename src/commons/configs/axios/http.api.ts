import { useErrorMessage } from '@commons/store/appStatus/errorMessage/useErrorMessage';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { ResponseData } from '@commons/types/responseData';
import { getAppVersion } from '@commons/utils/data/getAppVersion/getAppVersion';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import axios from 'axios';
import * as Device from 'expo-device';

export const httpApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

const appVersion = getAppVersion();

httpApi.interceptors.request.use(async (request) => {
  console.debug('headers: ', request.headers);
  console.debug('method: ', request.method);
  console.debug(`url: ${process.env.EXPO_PUBLIC_BASE_URL}${request.url}`);
  console.debug('params: ', request.params);
  console.debug('body: ', request.data);
  return request;
});

httpApi.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().bookblaToken;
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
    const { sdk } = useSendbirdChat();
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        useErrorMessage.getState().setErrorMessage('일주일이 경과되어 자동 로그아웃 되었습니다.');
        // if (Platform.OS === 'ios') {
        //   const token = await messaging().getAPNSToken();
        //   messaging().onTokenRefresh(async (newToken: string) => {
        //     console.debug('refresh token');
        //   });
        //   await sdk.unregisterAPNSPushTokenForCurrentUser(token ?? '');
        // } else {
        //   const token = await messaging().getToken();
        //   messaging().onTokenRefresh(async (newToken: string) => {
        //     console.debug('refresh token');
        //   });
        //   await sdk.unregisterFCMPushTokenForCurrentUser(token);
        // }
        useUserStore.getState().resetUserInfo();
        useStyleStore.getState().resetStyleInfo();
        useMemberStore.getState().resetMemberInfo();
        useAppStatus.getState().resetStatus();
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

const handleError = (error: unknown, showToast: boolean) => {
  if (axios.isAxiosError(error)) {
    if (showToast) {
      useToastStore.getState().showToast({ content: error.message });
    }
  }
};

export const Get = async <T>(url: string, params = {}, showToast: boolean = false): Promise<ResponseData<T>> => {
  try {
    const response = await httpApi.get(url, {
      ...config,
      ...params,
    });
    return response.data;
  } catch (error) {
    handleError(error, showToast);
    return Promise.reject(error);
  }
};

export const Post = async <T, D = unknown>(
  url: string,
  data?: D,
  showToast: boolean = false,
): Promise<ResponseData<T>> => {
  try {
    const response = await httpApi.post(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error, showToast);
    return Promise.reject(error);
  }
};

export const Put = async <T, D = unknown>(
  url: string,
  data?: D,
  showToast: boolean = false,
): Promise<ResponseData<T>> => {
  try {
    const response = await httpApi.put(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error, showToast);
    return Promise.reject(error);
  }
};

export const Delete = async <T>(url: string, showToast: boolean = false): Promise<ResponseData<T>> => {
  try {
    const response = await httpApi.delete(url, config);
    return response.data;
  } catch (error) {
    handleError(error, showToast);
    return Promise.reject(error);
  }
};

export const Patch = async <T, D = unknown>(
  url: string,
  data?: D,
  showToast: boolean = false,
): Promise<ResponseData<T>> => {
  try {
    const response = await httpApi.patch(url, data, config);
    return response.data;
  } catch (error) {
    handleError(error, showToast);
    return Promise.reject(error);
  }
};
