import { Post } from '../../utils/http.api';

export const postLogin = (authCode: string, type: string) => Post(`auth/login/${type}`, { authCode });
