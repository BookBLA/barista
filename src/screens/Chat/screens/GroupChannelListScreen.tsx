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
import { PASS, SendbirdChatSDK, confirmAndMarkAsDelivered, useAppState, useFreshCallback } from '@sendbird/uikit-utils';
import { useSendbirdChat } from '@sendbird/uikit-react-native/src/hooks/useContext';
import { useGroupChannelList } from '@sendbird/uikit-tools';
import type { GroupChannelListProps } from '@sendbird/uikit-react-native/src/domain/groupChannelList/types';
import GroupChannelPreviewContainer from '@sendbird/uikit-react-native/src/containers/GroupChannelPreviewContainer';
import { GroupChannelCollection, GroupChannelFilter } from '@sendbird/chat/groupChannel';

// TODO: Create Channel Fragment 삭제
const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelListModule = createGroupChannelListModule();

export const GroupChannelListScreen = () => {
  useScreenLogger();
  const navigation = useNavigation<any>();

  const flatListProps = {};
  const { sdk, sbOptions, markAsDeliveredWithChannel } = useSendbirdChat();
  const { groupChannels, loadMore, initialized } = useGroupChannelList(sdk, {
    collectionCreator: getCollectionCreator(sdk),
    markAsDelivered: confirmAndMarkAsDelivered,
  });

  useAppState('change', (status) => {
    if (sbOptions.appInfo.deliveryReceiptEnabled) {
      if (status === 'active') groupChannels.forEach(markAsDeliveredWithChannel);
    }
  });

  const _renderGroupChannelPreview: GroupChannelListProps['List']['renderGroupChannelPreview'] = useFreshCallback(
    (props) => {
      // if (renderGroupChannelPreview) return renderGroupChannelPreview(props);
      return <GroupChannelPreviewContainer {...props} />;
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
