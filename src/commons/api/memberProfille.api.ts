import { Post, Get, Put } from '../utils/http.api';

export const postMemberProfileApi = (contents) => Post(`member-profiles`, contents);

export const getMemberProfileApi = (memberId: number) => Get(`member-profiles?memberId=${memberId}`);

export const putMemberProfileApi = (memberId: number) => Put(`member-profiles?memberId=${memberId}`, contents);
