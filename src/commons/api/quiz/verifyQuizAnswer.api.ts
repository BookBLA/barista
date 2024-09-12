import { Post } from '@commons/configs/axios/http.api';
import { IVerifyQuizAnswer } from '@screens/Quiz/QuizStack.types';

export const postVerifyQuizAnswer = async (content: IVerifyQuizAnswer) => {
  const { result }: any = await Post('quizzes/verify', content);
  return {
    isCorrect: result.isCorrect,
  };
};
