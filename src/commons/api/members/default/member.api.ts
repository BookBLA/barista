import { Delete, Get, Post, Put } from '@commons/configs/axios/http.api';
import {
  MemberDeleteResponse,
  MemberInformationReadResponse,
  MemberInformationUpdateRequest,
  MemberResponse,
  MemberStatusResponse,
  MemberStatusUpdateRequest,
} from '@commons/types/openapiGenerator';

export interface IMemberStatusContents {
  memberStatus: string;
  reason?: string;
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

export const deleteMemberApi = () => Delete<MemberDeleteResponse>('members');

// DEPRECATED: 이 API 엔드포인트는 곧 사라질 예정입니다.
export const getMemberAllOtherMembersApi = (params: object) => Get<any>(`members/all-other-members/?size=10`, params);

// DEPRECATED: 이 API 엔드포인트는 곧 사라질 예정입니다.
export const getMemberPostcardsApi = () => Get<any>(`members/bookmarks`);

export const getMemberStatusesApi = () => Get<MemberStatusResponse>('members/statuses');

// export const postMemberStatusesApi = (contents: IMemberStatusContents) => Post('members/status', contents);

export const GetMyInfoApi = () => Get<MemberInformationReadResponse>('members/me/information');

export const PutMyInfoApi = (contents: MemberInformationUpdateRequest) => Put('members/me/information', contents);

export const postMemberStatusesApi = (contents: MemberStatusUpdateRequest) =>
  Post<MemberStatusResponse>('members/status', contents);
