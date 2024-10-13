import { Post } from '@commons/configs/axios/http.api';
import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';

export const postPostcardSend = async (contents: ISendPostcardRequest, channel: string) => {
  const updatedContents = {
    ...contents,
    channelUrl: channel,
  };
  await Post('postcard/send', updatedContents, true);
};
