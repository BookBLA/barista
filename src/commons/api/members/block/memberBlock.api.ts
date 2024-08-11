import { Post } from '../../../configs/axios/http.api';

export const postMemberBlock = (id: number) => Post('member-blocks', { blockedMemberId: Number(id) });
