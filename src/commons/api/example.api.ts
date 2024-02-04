import { Get, Post } from '../utils/http.api';
import { AuthRequest } from './auth.api';

export interface ResponseData<T> {
  status: number;
  message: string;
  body: T;
}

export interface testGetRequest {
  contents: string;
}

export interface testPostRequest {
  contents: string;
}

export const getExampleApi = (contents: string): Promise<ResponseData<testGetRequest>> => {
  const params: testGetRequest = {
    contents,
  };

  return Get<ResponseData<testGetRequest>, testGetRequest>('tests', params);
};

export const postExampleApi = (contents: string): Promise<ResponseData<testPostRequest>> =>
  Post<ResponseData<testPostRequest>, string>('tests', contents);
