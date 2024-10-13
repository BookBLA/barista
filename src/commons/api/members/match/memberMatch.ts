import { Get, Post } from '@commons/configs/axios/http.api';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';

export const getMembersMatch = () => Get<MemberIntroResponse>(`members-match`);

export const postMembersMatchRefresh = () => Post<MemberIntroResponse>(`members-match/refresh`);

export interface IMemberReject {
  rejectedMemberId: number | undefined;
}
export const postMembersMatchReject = (contents: IMemberReject) =>
  Post<MemberIntroResponse>(`members-match/reject`, contents);
