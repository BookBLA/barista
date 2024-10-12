import { Post } from '@commons/configs/axios/http.api';

export const postChatAccept = (targetMemberId: number) => Post('sendbird/chat');
