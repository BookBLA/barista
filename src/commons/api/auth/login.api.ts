import { Post } from '@commons/configs/axios/http.api';

export const postLogin = (authCode: string, type: string) => Post(`auth/login/${type}`, { authCode });
