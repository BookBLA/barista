import { Post } from '../../../utils/http.api';

export const postMemberBlock = (id: number) => Post('member-blocks', { blockedMemberId: Number(id) });
