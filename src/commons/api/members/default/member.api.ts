import { Delete, Get, Post } from '@commons/configs/axios/http.api';
import { MemberResponse } from '@commons/types/openapiGenerator';

export interface IMemberStatusContents {
  memberStatus: string;
  reason: string;
}

export interface IMember {
  id: number;
  oauthEmail: string;
  oauthProfileImageUrl: string;
  memberType: string;
  memberStatus: string;
  memberGender: string;
}

export const getMemberApi = () => Get<MemberResponse>('members');

export const deleteMemberApi = () => Delete('members');

export const getMemberAllOtherMembersApi = (params: object) => Get(`members/all-other-members/?size=10`, params);

export const getMemberPostcardsApi = () => Get(`postcard`);

export const getMemberStatusesApi = () => Get('members/statuses');

export const postMemberStatusesApi = (contents: IMemberStatusContents) => Post('members/status', contents);
