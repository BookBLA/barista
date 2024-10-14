import { Post } from '@commons/configs/axios/http.api';
import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';

export const postPostcardSend = async (contents: ISendPostcardRequest) => {
  await Post('postcard/send', contents, true);
};
