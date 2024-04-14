import { IRequestQuizzes } from '../../screens/InitBook/InitBook.types';
import { Get, Post } from '../utils/http.api';

export const getMemberQuizzesApi = (memberBookId: string) => Get(`quizzes/${memberBookId}`);

export const postMemberQuizzesApi = (contents: IRequestQuizzes, memberBookId: string) =>
  Post(`quizzes/${memberBookId}`, contents);
