import { Get, Post, Put } from '@commons/configs/axios/http.api';

export const postMemberStyleApi = (contents) => Post(`members/styles`, contents);

export const getMemberStyleApi = (memberId: number) => Get(`members/styles/${memberId}`);

export const putMemberStyleApi = (contents) => Put(`members/styles`, contents);
