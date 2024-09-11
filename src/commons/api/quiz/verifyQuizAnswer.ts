import { Post } from '@commons/configs/axios/http.api';
import { IPostPostcard, IVerifyQuizAnswer } from '@screens/Quiz/QuizStack.types';

export const postVerifyQuizAnswer = async (content: IVerifyQuizAnswer) => Post('quizzes/verify', content);

export const postPostcard = async (contents: IPostPostcard) => Post('postcard/send', contents, true);
