import { Post } from '@commons/configs/axios/http.api';
import { LoginResponse, SendbirdResponse } from '@commons/types/openapiGenerator';
import { TAuthCode } from './login.types';

export const postLogin = (authCode: TAuthCode, type: string) => Post<LoginResponse>(`auth/login/${type}`, { authCode });

export const postSendbird = () => Post<SendbirdResponse>('sendbird');
