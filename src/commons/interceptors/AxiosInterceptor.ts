// requestInterceptor.ts
import axios, { InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const axiosInstance = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

const onRequest = async (config: InternalAxiosRequestConfig): Promise<InternalAxiosRequestConfig> => {
  const { method, url } = config;
  console.log(`🛫 [API - REQUEST] ${method?.toUpperCase()} ${url}`);

  const token = await getAccessToken();
  config.headers.Authorization = `Bearer ${token}`;
  return config;
};

const getAccessToken = async () => {
  try {
    return await AsyncStorage.getItem('accessToken');
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
};

axiosInstance.interceptors.request.use(onRequest);

export default axiosInstance;
