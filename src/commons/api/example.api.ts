import { Post } from '../utils/http.api';

export interface IExampleApi {
  contents: string;
}

export interface ITestSignUp {
  email: string;
}

export const postExampleApi = (contents: IExampleApi) => Post('tests', contents, true);

export const postTestSignUp = (contents: ITestSignUp) => Post('tests/sign-up', contents, true);
