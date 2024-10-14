import React, { useEffect, useMemo, useState } from 'react';
import { Linking, Platform, View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import _ from 'lodash';

import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { ConfirmChatModal } from '@screens/Chat/units/modal/ConfirmChatModal';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import { postChatAccept, postChatReject } from '@screens/Chat/Chat.api';
import { EndChatModal } from '@screens/Chat/units/modal/EndChatModal';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';

import { createGroupChannelFragment, useSendbirdChat } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import { NOOP } from '@sendbird/uikit-utils';
import { useToast } from '@sendbird/uikit-react-native-foundation';

const MODAL_STATE_NONE = 'none';
const MODAL_STATE_ACCEPT = 'accept';
const MODAL_STATE_YET = 'yet';
const MODAL_STATE_DENY = 'deny';
const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const toast = useToast();
  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['78%'], []);
  const [isReport, setIsReport] = useState(false);
  const [isConfirm, setIsConfirm] = useState(MODAL_STATE_NONE);
  const { toggle: endChatToggle, isOpen: isEndChatToggleOpen } = useToggle(false);

  const [targetMemberId, setTargetMemberId] = useState(0);
  const [sendMemberId, setSendMemberId] = useState(0);
  const [sendMemberName, setSendMemberName] = useState('');

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } });
    });
    return () => {
      navigation.getParent()?.setOptions({
        tabBarStyle: {
          display: 'flex',
          height: '8%',
          ...Platform.select({
            ios: {
              paddingTop: 8,
              paddingBottom: 10,
            },
            android: {
              paddingTop: 8,
              paddingBottom: 10,
            },
          }),
        },
      });
      unsubscribe();
    };
  }, [navigation]);

  const originalOpenURL = Linking.openURL;
  Linking.openURL = (url) => {
    if (url.startsWith('http')) {
      console.log('Blocked external link:', url);
      return Promise.resolve(false); // 외부 링크 차단
    } else {
      return originalOpenURL(url); // 외부 링크가 아니면 원래 동작 유지
    }
  };

  const { sdk, currentUser } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  const metaData = channel.getMetaData(['acceptStatus', 'targetMemberId', 'sendMemberId', 'sendMemberName']);
  metaData.then((res) => {
    const acceptStatus = res.acceptStatus === MODAL_STATE_YET;
    const target = res.targetMemberId === currentUser?.userId;

    setTargetMemberId(parseInt(res.targetMemberId, 10) ?? 0);
    setSendMemberId(parseInt(res.sendMemberId, 10) ?? 0);
    setSendMemberName(res.sendMemberName ?? '');

    if (acceptStatus && target) {
      setIsConfirm(MODAL_STATE_YET);
    }
  });

  const chatAccept = _.debounce(async () => {
    try {
      await channel.updateMetaData({ acceptStatus: MODAL_STATE_ACCEPT });
      setIsConfirm(MODAL_STATE_ACCEPT);
      await postChatAccept(targetMemberId);
      toast.show('채팅을 수락했어요', 'normal');
    } catch (error) {
      console.error(error);
      toast.show('채팅을 수락하는 도중 문제가 생겼습니다', 'error');
    }
  }, 500);

  const chatDeny = _.debounce(async () => {
    try {
      await channel.updateMetaData({ acceptStatus: MODAL_STATE_DENY });
      setIsConfirm(MODAL_STATE_DENY);
      await postChatReject(sendMemberId);
      await channel.leave().then(() => sdk.clearCachedMessages([channel.url]).catch(NOOP));
      toast.show('채팅을 거절했어요', 'normal');
    } catch (error) {
      console.error(error);
      toast.show('채팅을 거절하는 도중 문제가 생겼습니다', 'error');
    }
  }, 500);

  if (isReport) {
    setIsConfirm(MODAL_STATE_DENY);
    setTimeout(() => {}, 1500);
    channel.leave().then(() => {
      sdk.clearCachedMessages([channel.url]).catch();
    });
  }
  console.log(isConfirm);

  // TODO - 한결: 상대방이 나갔을 경우 EndChatModal 띄워야 함.
  // FIXME - 한결: 작은 화면을 가진 핸드폰은 Offset값이 너무 큼. 적절히 조정 필요해보임
  // @ts-ignore
  return (
    <>
      <GroupChannelFragment
        enableTypingIndicator
        keyboardAvoidOffset={Platform.OS === 'ios' ? 100 : 25}
        channel={channel}
        onPressMediaMessage={(message, deleteMessage, uri) => {
          console.log(channel?.url);
        }}
        onChannelDeleted={() => {
          // Navigate to GroupChannelList function.
          navigation.navigate('GroupChannelList');
        }}
        onPressHeaderLeft={() => {
          // Go back to the previous screen.
          navigation.goBack();
        }}
        onPressHeaderRight={() => {
          // Navigate to GroupChannelSettings function.
          navigation.push('GroupChannelSettings', { channelUrl: params.channelUrl });
        }}
      />
      {isConfirm === MODAL_STATE_YET && (
        <ConfirmChatModal
          sendMemberName={sendMemberName}
          report={reportBottomSheet.handleOpenBottomSheet}
          chatAccept={chatAccept}
          chatDeny={chatDeny}
        />
      )}
      {isConfirm === MODAL_STATE_YET && <View style={{ height: 80, width: '100%' }} />}
      {/*<EndChatModal*/}
      {/*  visible={isEndChatToggleOpen}*/}
      {/*  onClose={endChatToggle}*/}
      {/*  leave={() => {*/}
      {/*    endChatToggle();*/}
      {/*    channel.leave().then(() => {*/}
      {/*      sdk.clearCachedMessages([channel.url]).catch();*/}
      {/*    });*/}
      {/*  }}*/}
      {/*/>*/}
      <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
        <ReportOption
          bottomClose={reportBottomSheet.handleCloseBottomSheet}
          reportedMemberId={targetMemberId}
          setIsReported={setIsReport}
        />
      </CustomBottomSheetModal>
    </>
  );
};
