import { Delete, Get, Post } from '../../../configs/axios/http.api';

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

export const getMemberApi = () => Get('members');

export const deleteMemberApi = () => Delete('members');

export const getMemberAllOtherMembersApi = (params: object) => Get(`members/all-other-members/?size=10`, params);

export const getMemberPostcardsApi = () => Get(`postcard`);

export const getMemberStatusesApi = () => Get('members/statuses');

export const postMemberStatusesApi = (contents: IMemberStatusContents) => Post('members/status', contents);
