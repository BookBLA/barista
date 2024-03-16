import { Post } from '../utils/http.api';

export interface testRequest {
  contents: string;
}

export const postExampleApi = (contents: testRequest) => Post('tests', contents, true);
