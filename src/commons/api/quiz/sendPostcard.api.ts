import { Post } from '@commons/configs/axios/http.api';
import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';

export const postPostcardSend = (contents: ISendPostcardRequest) => Post('postcard/send', contents, true);
