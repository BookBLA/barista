import { Post } from '@commons/configs/axios/http.api';
import { IPostPostcard, IVerifyQuizAnswer } from '@screens/Quiz/QuizStack.types';

export const postVerifyQuizAnswer = async (content: IVerifyQuizAnswer) => {
  const { result }: any = await Post('quizzes/verify', content);
  return {
    isCorrect: result.isCorrect,
  };
};

export const postPostcard = async (contents: IPostPostcard) => Post('postcard/send', contents, true);
