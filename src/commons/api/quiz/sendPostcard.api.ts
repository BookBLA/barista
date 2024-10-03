import { Post } from '@commons/configs/axios/http.api';
import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';
import { getBookInfo } from '@commons/api/postcard/library.api';

import {
  GroupChannel,
  GroupChannelCreateParams,
  GroupChannelModule,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel';
import SendbirdChat from '@sendbird/chat';
import {
  FileMessageCreateParams,
  UserMessageCreateParams,
  MentionType,
  FileMessage,
  UserMessage,
  PushNotificationDeliveryOption,
  MessageMetaArray,
} from '@sendbird/chat/message';

export const postPostcardSend = async (contents: ISendPostcardRequest, memberId: number) => {
  await Post('postcard/send', contents, true);

  const sendMemberId = memberId.toString();
  const sendMemberReview = contents.memberReply;
  const targetMemberId = contents.receiveMemberBookId.toString();
  const targetMemberBookId = contents.receiveMemberBookId.toString();

  // Create GroupChannel
  const metaData = {
    sendMemberId,
    targetMemberId,
    targetMemberBookId,
    isAccept: 'false',
  };

  const sb = SendbirdChat.init({
    appId: `${process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}`,
    modules: [new GroupChannelModule()],
  }) as SendbirdGroupChat;

  const channelCreateParams: GroupChannelCreateParams = {
    invitedUserIds: [sendMemberId, targetMemberId],
    isDistinct: true,
    isPublic: false,
  };
  const channel: GroupChannel = await sb.groupChannel.createChannel(channelCreateParams);
  await channel.createMetaData(metaData);
  console.debug('GroupChat initialize -', sendMemberId, targetMemberId, 'book -', targetMemberBookId);

  // Send Messages(book thumbnail, reason)
  const res = await getBookInfo(contents.receiveMemberBookId);
  const bookThumbnail = res.imageUrl;
  const uniqueThumbnailUrl = `${bookThumbnail}?timestamp=${new Date().getTime()}`;

  const fileMessageCreateParams: FileMessageCreateParams = {
    fileUrl: uniqueThumbnailUrl,
    fileName: 'book-thumbnail.png',
    fileSize: 0,
    mimeType: 'image/png',
    // TODO - 한결: 썸네일 사이즈 조정이 안됨;;
    thumbnailSizes: [{ maxWidth: 105, maxHeight: 147 }],
    mentionType: MentionType.USERS,
    pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT,
  };

  channel
    .sendFileMessage(fileMessageCreateParams)
    .onSucceeded((message: FileMessage) => {
      const messageId = message.messageId;
      console.debug('Message sent with ID:', messageId);
    })
    .onFailed((error: any) => {
      console.error('Failed to send message:', error);
    });

  const userMessageCreateParams: UserMessageCreateParams = {
    message: sendMemberReview,
    mentionType: MentionType.USERS,
    mentionedUserIds: [targetMemberId],
    metaArrays: [new MessageMetaArray({ key: 'memberBookId', value: [targetMemberBookId] })],
    pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
  };
  // @ts-ignore
  channel.sendUserMessage(userMessageCreateParams).onSucceeded((message: UserMessage) => {
    const messageId = message.messageId;
  });
  console.debug('GroupChat message send complete', sendMemberId, targetMemberId);
};
