import { Delete, Get, Post, Put } from '@commons/configs/axios/http.api';
import {
  MemberInformationReadResponse,
  MemberInformationUpdateRequest,
  MemberResponse,
  MemberStatusResponse,
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

export const deleteMemberApi = () => Delete('members');

export const getMemberAllOtherMembersApi = (params: object) => Get(`members/all-other-members/?size=10`, params);

export const getMemberPostcardsApi = () => Get(`postcard`);

export const getMemberStatusesApi = () => Get<MemberStatusResponse>('members/statuses');

export const postMemberStatusesApi = (contents: IMemberStatusContents) => Post('members/status', contents);

export const GetMyInfoApi = () => Get<MemberInformationReadResponse>('members/me/information');

export const PutMyInfoApi = (contents: MemberInformationUpdateRequest) => Put('members/me/information', contents);
