import { Post } from '@commons/configs/axios/http.api';

export const postChatAccept = async (targetMemberId: number, channelUrl: string) => {
  const contents = {
    targetMemberId,
    channelUrl,
  };
  await Post('sendbird/entry/accept', contents);
};

export const postChatReject = async (targetMemberId: number, channelUrl: string) => {
  const contents = {
    targetMemberId,
    channelUrl,
  };
  await Post('sendbird/entry/reject', contents);
};
