import axios from 'axios';

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

export const Post = async <T, D>(url: string, data?: D): Promise<T> => {
  return await httpApi
    .post(url, data, config)
    .then((response) => {
      return response?.data;
    })
    .catch((error) => {
      console.log(error.message);
    });
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
