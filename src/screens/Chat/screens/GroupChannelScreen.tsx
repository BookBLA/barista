import React, { useEffect, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { ConfirmChatModal } from '@screens/Chat/units/modal/ConfirmChatModal';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';

import { createGroupChannelFragment, useSendbirdChat } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import { NOOP } from '@sendbird/uikit-utils';

const MODAL_STATE_NONE = 'none';
const MODAL_STATE_ACCEPT = 'accept';
const MODAL_STATE_YET = 'yet';
const MODAL_STATE_DENY = 'deny';
const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();
  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['78%'], []);
  const [isConfirm, setIsConfirm] = useState(MODAL_STATE_NONE);

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

  const { sdk, currentUser } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  const metaData = channel.getMetaData(['acceptStatus', 'targetMemberId', 'sendMemberId', 'sendMemberName']);
  let targetMemberId = 0;
  let sendMemberName = '';
  metaData.then((res) => {
    const acceptStatus = res.acceptStatus === MODAL_STATE_YET;
    const target = res.targetMemberId === currentUser?.userId;

    targetMemberId = parseInt(res.targetMemberId, 10) ?? 0;
    sendMemberName = res.sendMemberName ?? '';

    if (acceptStatus && target) {
      setIsConfirm(MODAL_STATE_YET);
    }
  });

  const chatAccept = () => {
    setIsConfirm(MODAL_STATE_ACCEPT);
    channel.updateMetaData({ acceptStatus: MODAL_STATE_ACCEPT });
  };
  const chatDeny = () => {
    setIsConfirm(MODAL_STATE_DENY);
    channel.updateMetaData({ acceptStatus: MODAL_STATE_DENY });
    channel.leave().then(() => sdk.clearCachedMessages([channel.url]).catch(NOOP));
  };
  console.log(isConfirm);

  // FIXME - 한결: 작은 화면을 가진 핸드폰은 Offset값이 너무 큼. 적절히 조정 필요해보임
  return (
    <>
      <GroupChannelFragment
        enableTypingIndicator
        keyboardAvoidOffset={Platform.OS === 'ios' ? 60 : 25}
        channel={channel}
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
          navigation.navigate('GroupChannelSettings', { channelUrl: params.channelUrl });
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
      <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
        <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} reportedMemberId={targetMemberId} />
      </CustomBottomSheetModal>
    </>
  );
};
