import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';
import { getBookInfo } from '@commons/api/postcard/library.api';

import SendbirdChat from '@sendbird/chat';
import {
  GroupChannel,
  GroupChannelCreateParams,
  GroupChannelHideParams,
  GroupChannelModule,
  SendbirdGroupChat,
} from '@sendbird/chat/groupChannel';
import {
  FileMessage,
  FileMessageCreateParams,
  MentionType,
  MessageMetaArray,
  PushNotificationDeliveryOption,
  UserMessage,
  UserMessageCreateParams,
} from '@sendbird/chat/message';

export const CreateChat = async (contents: ISendPostcardRequest, memberId: number, memberName: string) => {
  const sendMemberId = memberId.toString();
  const sendMemberName = memberName;
  const sendMemberReview = contents.memberReply;
  const targetMemberId = contents.receiveMemberId.toString();
  const targetMemberBookId = contents.receiveMemberBookId.toString();

  // Create GroupChannel
  const metaData = {
    sendMemberId,
    sendMemberName,
    targetMemberId,
    targetMemberBookId,
    acceptStatus: 'yet',
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

  // // pin Messages(User Information)
  // const { result: memberProfile} = await getMemberProfileApi();
  // const { result: memberInfo } = await GetMyInfoApi();
  // const userInfoMessage = `${memberProfile.name}\n${memberProfile.schoolName}\n${memberInfo.smokeType} ${memberInfo.mbti} ${memberInfo.height}`;
  // const userInfoMessageParams: UserMessageCreateParams = {
  //   message: userInfoMessage,
  //   mentionType: MentionType.USERS,
  //   mentionedUserIds: [targetMemberId],
  //   isPinnedMessage: true,
  //   metaArrays: [new MessageMetaArray({ key: 'memberBookId', value: [targetMemberBookId] })],
  //   pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
  // };
  // // @ts-ignore
  // channel.sendUserMessage(userInfoMessageParams).onSucceeded((message: UserMessage) => {
  //   const messageId = message.messageId;
  //   channel.pinMessage(message.messageId);
  // });

  // hide Channel until read postcard
  const params: GroupChannelHideParams = {
    hidePreviousMessages: true,
    allowAutoUnhide: false,
  };
  await channel.hide(params);

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

  // @ts-ignore
  channel.sendFileMessage(fileMessageCreateParams).onSucceeded((message: FileMessage) => {
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

  return channel.url;
};
