import { Get, Patch, Post, Put } from '@commons/configs/axios/http.api';
import {
  MemberProfileCreateRequest,
  MemberProfileImageTypeUpdateRequest,
  MemberProfileStudentIdReadResponse,
  ProfileImageTypeReadResponse,
} from '@commons/types/openapiGenerator';

interface IPatchMemberProfile {
  openKakaoRoomUrl: string;
  name: string;
  schoolName: string;
}

interface IMemberProfile {
  memberId: number;
  name: string;
  birthDate: string;
  schoolName: string;
  schoolEmail: string;
  gender: string;
}

export const postMemberProfileApi = (contents: MemberProfileCreateRequest) => Post(`member-profiles`, contents);

export const getMemberProfileApi = () => Get<IMemberProfile>(`member-profiles`);

export const putMemberProfileApi = (contents: MemberProfileCreateRequest) => Put(`member-profiles`, contents);

export const getMemberProfileStatusesApi = () => Get(`member-profiles/statuses`);

export const patchMemberProfileImageApi = (contents: MemberProfileImageTypeUpdateRequest) =>
  Patch(`members/styles/profile-image-type`, contents);

export const patchMemberProfileApi = (contents: IPatchMemberProfile) => Patch(`members/me/member-profile`, contents);

export const getProfileImageType = () => Get<ProfileImageTypeReadResponse>('/members/me/profile-image-types');

export const postStudentIdImageApi = (contents: string) => Post(`member-profiles/student-id/image`, contents);

export const getStudentIdImageStatusApi = () =>
  Get<MemberProfileStudentIdReadResponse>(`/member-profiles/student-id/status`);

export const postNicknameVerifyApi = (name: string) => Post(`member-profiles/verify/name`, { name });
