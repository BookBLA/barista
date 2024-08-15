import { Get, Post } from '@commons/configs/axios/http.api';
import { IRequestQuizzes } from '@screens/InitBook/InitBookStack.types';

export const getMemberQuizzesApi = (memberBookId: string) => Get(`quizzes/${memberBookId}`);

export const postMemberQuizzesApi = (contents: IRequestQuizzes, memberBookId: string) =>
  Post(`quizzes/${memberBookId}`, contents);
