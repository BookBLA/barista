import { Get } from '../utils/http.api';

export interface ResponseData<T> {
  status: number;
  message: string;
  body: T;
}

export interface usersRequest {
  name: string;
  age: number;
}

export const getUsersApi = (): Promise<ResponseData<usersRequest[]>> => Get<ResponseData<usersRequest[]>>('');
