import { Get, Post } from '@commons/configs/axios/http.api';
import { MemberBookmarkAdmobResponse } from '@commons/types/openapiGenerator';

export const getMemberAdmobApi = () => Get<MemberBookmarkAdmobResponse>('members/me/admob');

export const postMemberAdmobApi = (contents: MemberBookmarkAdmobResponse) => Post('members/me/admob', contents);
