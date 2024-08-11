import { IRequestQuizzes } from '../../../screens/InitBook/InitBookStack.types';
import { Get, Post } from '../../configs/axios/http.api';

export const getMemberQuizzesApi = (memberBookId: string) => Get(`quizzes/${memberBookId}`);

export const postMemberQuizzesApi = (contents: IRequestQuizzes, memberBookId: string) =>
  Post(`quizzes/${memberBookId}`, contents);
