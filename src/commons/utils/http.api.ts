import axios, { AxiosRequestConfig } from 'axios';

export const httpApi = axios.create({ baseURL: process.env.EXPO_PUBLIC_BASE_URL });

const config = {};

export const Get = async <T>(url: string): Promise<T> => {
  return await httpApi
    .get(url, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const GetWithAuth = async <T>(url: string, headers?: AxiosRequestConfig['headers']): Promise<T> => {
  try {
    const response = await httpApi.get(url, { ...config, headers });
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

export const Post = async <T, D>(url: string, data?: D, headers?: AxiosRequestConfig['headers']): Promise<T> => {
  try {
    const response = await httpApi.post(url, data, { ...config, headers });
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
  return await httpApi
    .put(url, data, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

export const Delete = async <T>(url: string): Promise<T> => {
  return await httpApi
    .delete(url, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
};
