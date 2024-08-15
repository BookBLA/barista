import { Get, Patch, Post, Put } from '@commons/configs/axios/http.api';

interface IPatchMemberProfile {
  openKakaoRoomUrl: string;
  name: string;
  phoneNumber: string;
  schoolName: string;
}

export const postMemberProfileApi = (contents) => Post(`member-profiles`, contents);

export const getMemberProfileApi = () => Get(`member-profiles`);

export const putMemberProfileApi = (contents) => Put(`member-profiles`, contents);

export const getMemberProfileStatusesApi = () => Get(`member-profiles/statuses`);

export const patchMemberProfileImageApi = (contents: { profileImageUrl: string }) =>
  Patch(`members/me/profile/profile-image`, contents);

export const patchMemberProfileApi = (contents: IPatchMemberProfile) => Patch(`members/me/member-profile`, contents);
