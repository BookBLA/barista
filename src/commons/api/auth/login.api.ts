import { Post } from '../../configs/axios/http.api';

export const postLogin = (authCode: string, type: string) => Post(`auth/login/${type}`, { authCode });
