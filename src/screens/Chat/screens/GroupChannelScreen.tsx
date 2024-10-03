import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';

import { createGroupChannelFragment, useSendbirdChat } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();

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

  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  // FIXME - 한결: 작은 화면을 가진 핸드폰은 Offset값이 너무 큼. 적절히 조정 필요해보임
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 25}
    >
      <GroupChannelFragment
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
    </KeyboardAvoidingView>
  );
};
