import { Delete, Get, Post } from '../utils/http.api';

export interface IMemberStatusContents {
  memberStatus: string;
  reason: string;
}

export const getMemberApi = () => Get('members');

export const deleteMemberApi = () => Delete('members');

export const getMemberAllOtherMembersApi = (params: object) => Get(`members/all-other-members/`, params);

export const getMemberPostcardsApi = () => Get(`members/postcards`);

export const getMemberStatusesApi = () => Get('members/statuses');

export const postMemberStatusesApi = (contents: IMemberStatusContents) => Post('members/status', contents);
