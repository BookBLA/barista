import { Get, Post } from '@commons/configs/axios/http.api';

// 초대 코드 확인
export const postInviteCodeVerifyApi = (code: string) =>
  Post(`invitation-code`, {
    invitationCode: code,
  });

// 초대 코드 가져오기
export const getInviteCodeApi = () => Get(`invitation-code`);
