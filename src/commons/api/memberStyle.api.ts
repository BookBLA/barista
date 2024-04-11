import { Post, Get } from '../utils/http.api';

export const postMemberStyleApi = (contents, memberId: number) => Post(`members/styles?memberId=${memberId}`, contents);

export const getMemberStyleApi = (memberId: number) => Get(`members/styles/${memberId}`);
