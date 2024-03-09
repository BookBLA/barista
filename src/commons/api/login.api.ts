import { Post } from '../utils/http.api';

export const postAppleLogin = (authCode: string) => {
  const data = {
    authCode: authCode,
  };
  Post('auth/login/apple', data);
};
