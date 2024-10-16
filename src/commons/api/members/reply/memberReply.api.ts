import { Get, Put } from '@commons/configs/axios/http.api';

export const getMemeberReplyApi = (postcardId: number) => Get(`members/member-reply/${postcardId}`);

export const putMemberReplyApi = (postcardId: number, content: string) =>
  Put(`members/member-reply`, { postcardId, content });
