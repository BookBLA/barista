import { Delete, Get, Post } from '@commons/configs/axios/http.api';
import {
  MemberDeleteResponse,
  MemberResponse,
  MemberStatusResponse,
  MemberStatusUpdateRequest,
} from '@commons/types/openapiGenerator';

export const getMemberApi = () => Get<MemberResponse>('members');

export const deleteMemberApi = () => Delete<MemberDeleteResponse>('members');

// DEPRECATED: 이 API 엔드포인트는 곧 사라질 예정입니다.
export const getMemberAllOtherMembersApi = (params: object) => Get<any>(`members/all-other-members/?size=10`, params);

// DEPRECATED: 이 API 엔드포인트는 곧 사라질 예정입니다.
export const getMemberPostcardsApi = () => Get<any>(`postcard`);

export const getMemberStatusesApi = () => Get<MemberStatusResponse>('members/statuses');

export const postMemberStatusesApi = (contents: MemberStatusUpdateRequest) =>
  Post<MemberStatusResponse>('members/status', contents);
