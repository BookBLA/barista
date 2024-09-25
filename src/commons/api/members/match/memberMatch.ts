import { Get, Post } from '@commons/configs/axios/http.api';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';

export const getMembersMatch = () => Get<MemberIntroResponse>(`members-match`);

export interface IMemberMatch {
  refreshMemberId: number | undefined;
  refreshMemberBookId?: number | undefined;
}

export const postMembersMatchRefresh = (contents: IMemberMatch) =>
  Post<MemberIntroResponse>(`members-match/refresh`, contents);

export const postMembersMatchReject = (contents: IMemberMatch) =>
  Post<MemberIntroResponse>(`members-match/reject`, contents);
