import { Post } from '../../../configs/axios/http.api';

export const postPushes = (contents: { token: string }) => Post(`members/tokens`, contents);
