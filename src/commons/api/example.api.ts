import { Post } from '../utils/http.api';

export interface ResponseData<T> {
  status: number;
  message: string;
  body: T;
}

export interface testRequest {
  contents: string;
}

export const postExampleApi = (contents: string): Promise<ResponseData<testRequest>> =>
  Post<ResponseData<testRequest>, string>('tests', contents);
