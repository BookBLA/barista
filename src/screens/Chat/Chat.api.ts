import { Post } from '@commons/configs/axios/http.api';

export const postChatAccept = (targetMemberId: number) => Post('sendbird/entry/accept', targetMemberId);

export const postChatReject = (targetMemberId: number) => Post('sendbird/entry/reject', targetMemberId);
