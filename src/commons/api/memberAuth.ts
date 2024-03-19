import { Post } from '../utils/http.api';

export const postAuthApi = (contents, memberId: number) => Post(`member-auths/emails?memberId=${memberId}`, contents);
