import { Post, Put } from '../../../configs/axios/http.api';

//이메일 인증 코드 전송
export const postAuthEmailApi = (contents) => Post(`members/emails/sends`, contents);

//인증 코드 확인
export const postAuthVerifyApi = (contents) => Post(`members/emails/verifys`, contents);

//이메일 재인증
export const putAuthEmailApi = (contents) => Put(`members/emails/resends`, contents);
