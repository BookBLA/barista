import { Post, Get, Put } from '../utils/http.api';

export const postMemberStyleApi = (contents, memberId: number) => Post(`members/styles?memberId=${memberId}`, contents);

export const getMemberStyleApi = (memberId: number) => Get(`members/styles/${memberId}`);

export const putMemberStyleApi = (contents, memberId: number) => Put(`members/styles?memberId=${memberId}`, contents);
