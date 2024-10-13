import { ISendPostcardRequest } from '@screens/Quiz/QuizStack.types';
import { getBookInfo } from '@commons/api/postcard/library.api';

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
import useToastStore from '@commons/store/ui/toast/useToastStore';

export const CreateChat = async (contents: ISendPostcardRequest, memberId: number, memberName: string, sdk: any) => {
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

  const channelCreateParams: GroupChannelCreateParams = {
    invitedUserIds: [sendMemberId, targetMemberId],
    isDistinct: true,
    isPublic: false,
  };
  const channel: GroupChannel = await sdk.groupChannel.createChannel(channelCreateParams);
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

  // Send Messages(book thumbnail, reason)
  // const res = await getBookInfo(contents.receiveMemberBookId);
  // const bookThumbnail = res.imageUrl;
  //
  // const fileMessageCreateParams: FileMessageCreateParams = {
  //   fileUrl: bookThumbnail,
  //   fileName: 'book-thumbnail.png',
  //   fileSize: 0,
  //   mimeType: 'image/png',
  //   thumbnailSizes: [{ maxWidth: 105, maxHeight: 147 }],
  //   mentionType: MentionType.USERS,
  //   pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT,
  // };
  //
  // @ts-ignore
  // channel.sendFileMessage(fileMessageCreateParams).onSucceeded((message: FileMessage) => {
  //     const messageId = message.messageId;
  //     console.debug('Message sent with ID:', messageId);
  //   })
  //   .onFailed((error: any) => {
  //     console.error('Failed to send message:', error);
  //   });

  const res = await getBookInfo(contents.receiveMemberBookId);

  const bookTitleMessageCreateParams: UserMessageCreateParams = {
    message: `《${res.title}》`,
    metaArrays: [new MessageMetaArray({ key: 'memberBookId', value: [targetMemberBookId] })],
    pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
  };
  const userMessageCreateParams: UserMessageCreateParams = {
    message: sendMemberReview,
    metaArrays: [new MessageMetaArray({ key: 'memberBookId', value: [targetMemberBookId] })],
    pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
  };
  // @ts-ignore
  channel
    .sendUserMessage(bookTitleMessageCreateParams)
    .onSucceeded((message: UserMessage) => {
      channel.sendUserMessage(userMessageCreateParams);
      console.debug('GroupChat message send complete', sendMemberId, targetMemberId);
    })
    .onFailed((message: UserMessage) => {
      useToastStore.getState().showToast({ content: `엽서 보내기에 실패했습니다.\nsendUserMessage` });
      console.error('GroupChat message send Failed', sendMemberId, targetMemberId);
    });

  // hide Channel until read postcard
  const params: GroupChannelHideParams = {
    hidePreviousMessages: true,
    allowAutoUnhide: false,
  };
  await channel.hide(params);

  return channel;
};
