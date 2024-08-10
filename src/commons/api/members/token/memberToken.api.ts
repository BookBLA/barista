import { Post } from '../../../utils/http.api';

export const postPushes = (contents: { token: string }) => Post(`members/tokens`, contents);
