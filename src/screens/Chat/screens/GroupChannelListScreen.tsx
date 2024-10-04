import React from 'react';
import { useNavigation } from '@react-navigation/native';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { GroupChannelListEmpty } from '@screens/Chat/units/GroupChannelListEmpty';

import {
  createGroupChannelListFragment,
  createGroupChannelListModule,
  StatusComposition,
} from '@sendbird/uikit-react-native';
import {
  PASS,
  SendbirdChatSDK,
  confirmAndMarkAsDelivered,
  useAppState,
  useFreshCallback,
  SendbirdGroupChannel,
  NOOP,
} from '@sendbird/uikit-utils';
import { useLocalization, useSendbirdChat } from '@sendbird/uikit-react-native/src/hooks/useContext';
import { useGroupChannelList } from '@sendbird/uikit-tools';
import type { GroupChannelListProps } from '@sendbird/uikit-react-native/src/domain/groupChannelList/types';
import GroupChannelPreviewContainer from '@sendbird/uikit-react-native/src/containers/GroupChannelPreviewContainer';
import { GroupChannelCollection, GroupChannelFilter } from '@sendbird/chat/groupChannel';
import { PushTriggerOption } from '@sendbird/chat';
import { useActionMenu, useToast } from '@sendbird/uikit-react-native-foundation';

// TODO: Create Channel Fragment 삭제
const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelListModule = createGroupChannelListModule();

export const GroupChannelListScreen = () => {
  useScreenLogger();
  const navigation = useNavigation<any>();
  const { STRINGS } = useLocalization();
  const toast = useToast();
  const { openMenu } = useActionMenu();
  const flatListProps = {};
  const { sdk, sbOptions, currentUser, markAsDeliveredWithChannel } = useSendbirdChat();
  const { groupChannels, loadMore, initialized } = useGroupChannelList(sdk, {
    collectionCreator: getCollectionCreator(sdk),
    markAsDelivered: confirmAndMarkAsDelivered,
  });

  useAppState('change', (status) => {
    if (sbOptions.appInfo.deliveryReceiptEnabled) {
      if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
    }
  });

  const menuItemCreator = PASS;
  const onLongPress = useFreshCallback((channel: SendbirdGroupChannel) => {
    const action = channel.myPushTriggerOption === 'off' ? 'on' : 'off';
    const customNotificationTitle = action === 'on' ? '푸시 알림 켜기' : '푸시 알림 끄기';

    const menuItem = menuItemCreator({
      title: STRINGS.GROUP_CHANNEL_LIST.DIALOG_CHANNEL_TITLE(currentUser?.userId ?? '', channel),
      menuItems: [
        {
          title: customNotificationTitle,
          onPress: async () => {
            if (action === 'on') {
              await channel.setMyPushTriggerOption(PushTriggerOption.DEFAULT);
            } else {
              await channel.setMyPushTriggerOption(PushTriggerOption.OFF);
            }
          },
          onError: () => {
            toast.show(
              action === 'on' ? STRINGS.TOAST.TURN_ON_NOTIFICATIONS_ERROR : STRINGS.TOAST.TURN_OFF_NOTIFICATIONS_ERROR,
              'error',
            );
          },
        },
        {
          title: '채팅방 나가기',
          onPress: async () => {
            channel.leave().then(() => sdk.clearCachedMessages([channel.url]).catch(NOOP));
          },
          onError: () => toast.show(STRINGS.TOAST.LEAVE_CHANNEL_ERROR, 'error'),
        },
      ],
    });

    openMenu(menuItem);
  });

  const _renderGroupChannelPreview: GroupChannelListProps['List']['renderGroupChannelPreview'] = useFreshCallback(
    (props) => {
      const channel = props.channel;
      const onPress = () => {};
      return (
        <GroupChannelPreviewContainer channel={channel} onPress={onPress} onLongPress={() => onLongPress(channel)} />
      );
    },
  );

  useHeaderControl({
    title: '채팅',
    left: false,
  });
  return (
    // <GroupChannelListFragment
    //   onPressCreateChannel={(channelType) => {
    //     // Navigate to GroupChannelCreate function.
    //     navigation.navigate('GroupChannelCreate', { channelType });
    //   }}
    //   onPressChannel={(channel) => {
    //     // Navigate to GroupChannel function.
    //     navigation.navigate('GroupChannel', { channelUrl: channel.url });
    //   }}
    // />
    <GroupChannelListModule.Provider>
      <StatusComposition loading={!initialized} LoadingComponent={<GroupChannelListModule.StatusLoading />}>
        <GroupChannelListModule.List
          onPressChannel={(channel) => {
            navigation.navigate('GroupChannel', { channelUrl: channel.url });
          }}
          groupChannels={groupChannels}
          menuItemCreator={PASS}
          renderGroupChannelPreview={_renderGroupChannelPreview}
          onLoadNext={loadMore}
          flatListProps={{
            ListEmptyComponent: <GroupChannelListEmpty />,
            contentContainerStyle: { flexGrow: 1 },
            ...flatListProps,
          }}
        />
      </StatusComposition>
    </GroupChannelListModule.Provider>
  );
};

function getCollectionCreator(
  sdk: SendbirdChatSDK,
  channelListQueryParams?: GroupChannelListProps['Fragment']['channelListQueryParams'],
  deprecatedCreatorProp?: () => GroupChannelCollection,
) {
  if (!channelListQueryParams && deprecatedCreatorProp) return deprecatedCreatorProp;

  return (defaultParams: GroupChannelListProps['Fragment']['channelListQueryParams']) => {
    const params = { ...defaultParams, ...channelListQueryParams };
    return sdk.groupChannel.createGroupChannelCollection({
      ...params,
      filter: new GroupChannelFilter(params),
    });
  };
}
