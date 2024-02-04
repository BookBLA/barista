import { Post } from '../utils/http.api';

export interface ResponseData<T> {
  headers: {
    authorization: string;
  };
  status: number;
  message: string;
  body: T;
}

export interface AuthRequest {
  email: string;
}

export const loginApi = (email: string): Promise<ResponseData<AuthRequest>> => {
  const data: AuthRequest = {
    email,
  };

  return Post<ResponseData<AuthRequest>, AuthRequest>('auth', data);
};
