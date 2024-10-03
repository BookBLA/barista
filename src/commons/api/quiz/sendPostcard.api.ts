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
  // const res = await getBookInfo(contents.receiveMemberBookId);
  // const bookThumbnail = res.imageUrl;
  //
  // const fileMessageCreateParams: FileMessageCreateParams = {
  //   fileUrl: bookThumbnail,
  //   fileName: 'Thumbnail',
  //   thumbnailSizes: [
  //     { maxWidth: 100, maxHeight: 100 },
  //     { maxWidth: 200, maxHeight: 200 },
  //   ],
  //   mentionType: MentionType.USERS, // Either USERS or CHANNEL
  //   mentionedUserIds: [targetMemberId], // Or mentionedUsers = Array<User>;
  //   pushNotificationDeliveryOption: PushNotificationDeliveryOption.DEFAULT, // Either DEFAULT or SUPPRESS
  // };
  // channel.sendFileMessage(fileMessageCreateParams).onSucceeded((message: FileMessage) => {
  //   const messageId = message.messageId;
  //   const fileName = message.messageId;
  // });

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
