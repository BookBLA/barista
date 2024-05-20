import { Post } from '../utils/http.api';

export const postPushes = (contents: unknown) => Post(`members/tokens`, contents);
