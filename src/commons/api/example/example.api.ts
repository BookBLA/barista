import { Post } from '@commons/configs/axios/http.api';
import { TestSignUpRequest, TestSignUpResponse } from '@commons/types/openapiGenerator';

export const postTestSignUp = (contents: TestSignUpRequest) =>
  Post<TestSignUpResponse>('tests/sign-up/kakao', contents, true);
