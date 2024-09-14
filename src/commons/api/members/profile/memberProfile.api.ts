import { Get, Patch, Post, Put } from '@commons/configs/axios/http.api';
import {
  MemberProfileCreateRequest,
  MemberProfileImageTypeUpdateRequest,
  ProfileImageTypeReadResponse
} from '@commons/types/openapiGenerator';

interface IPatchMemberProfile {
  openKakaoRoomUrl: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
}

export const postMemberProfileApi = (contents: MemberProfileCreateRequest) => Post(`member-profiles`, contents);

export const getMemberProfileApi = () => Get(`member-profiles`);

export const putMemberProfileApi = (contents: MemberProfileCreateRequest) => Put(`member-profiles`, contents);

export const getMemberProfileStatusesApi = () => Get(`member-profiles/statuses`);

export const patchMemberProfileImageApi = (contents: MemberProfileImageTypeUpdateRequest) =>
  Patch(`members/styles/profile-image-type`, contents);

export const patchMemberProfileApi = (contents: IPatchMemberProfile) => Patch(`members/me/member-profile`, contents);

export const getProfileImageType = () => Get<ProfileImageTypeReadResponse>('/members/me/profile-image-types');

export const postStudentIdImageApi = (contents: string) => Post(`member-profiles/student-id/image`, contents);
