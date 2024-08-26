import { Get, Post, Put } from '@commons/configs/axios/http.api';
import { MemberStyleCreateRequest, MemberStyleResponse } from '@commons/types/openapiGenerator';

export const postMemberStyleApi = (contents: MemberStyleCreateRequest) => Post(`members/styles`, contents);

export const getMemberStyleApi = (memberId: number) => Get<MemberStyleResponse>(`members/styles/${memberId}`);

export const putMemberStyleApi = (contents: MemberStyleCreateRequest) => Put(`members/styles`, contents);
