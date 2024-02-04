import { AxiosRequestConfig } from 'axios';
import axiosInstance from '../interceptors/AxiosInterceptor';

const config = {};

export const Get = async <T, D>(url: string, params?: AxiosRequestConfig['params']): Promise<T> => {
  try {
    const response = await axiosInstance.get(url, { ...config, params });
    const { headers: responseHeaders, data: responseData } = response;
    return {
      headers: responseHeaders,
      data: responseData,
    } as T;
  } catch (error: any) {
    console.error(error);
    return Promise.reject(error);
  }
};

export const Post = async <T, D>(url: string, data?: D, headers?: AxiosRequestConfig['headers']): Promise<T> => {
  try {
    const response = await axiosInstance.post(url, data, { ...config, headers });
    const { headers: responseHeaders, data: responseData } = response;
    return {
      headers: responseHeaders,
      data: responseData,
    } as T;
  } catch (error: any) {
    console.error(error.message);
    return Promise.reject(error);
  }
};

export const Put = async <T, D>(url: string, data?: D): Promise<T> => {
  return await axiosInstance
    .put(url, data, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const Delete = async <T>(url: string): Promise<T> => {
  return await axiosInstance
    .delete(url, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
