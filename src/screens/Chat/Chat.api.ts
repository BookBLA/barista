import { Post } from '@commons/configs/axios/http.api';

export const postChatAccept = (targetMemberId: number) => Post('sendbird/entry/accept');

export const postChatReject = (targetMemberId: number) => Post('sendbird/entry/reject');
