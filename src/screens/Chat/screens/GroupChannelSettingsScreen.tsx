import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Pressable, View, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MenuBarProps } from '@screens/Chat/ChatStack.types';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import ReportOption from '@screens/Library/utils/ReportOption/ReportOption';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { LeaveChannelModal } from '@screens/Chat/units/modal/LeaveChannelModal';

import { createGroupChannelSettingsFragment, useSendbirdChat } from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import createGroupChannelSettingsModule from '@sendbird/uikit-react-native/src/domain/groupChannelSettings/module/createGroupChannelSettingsModule';
import { Icon, Switch, useHeaderStyle, useToast, useUIKitTheme } from '@sendbird/uikit-react-native-foundation';
import { GroupChannelSettingsContexts } from '@sendbird/uikit-react-native/src/domain/groupChannelSettings/module/moduleContext';
import { useLocalization } from '@sendbird/uikit-react-native/src/hooks/useContext';
import { PushTriggerOption } from '@sendbird/chat';
import { conditionChaining, SendbirdGroupChannel, useIIFE } from '@sendbird/uikit-utils';
import Text from '@sendbird/uikit-react-native-foundation/src/components/Text';
import createStyleSheet from '@sendbird/uikit-react-native-foundation/src/styles/createStyleSheet';

createGroupChannelSettingsFragment();
const GroupChannelSettingsModule = createGroupChannelSettingsModule();

export const GroupChannelSettingsScreen = ({ route: { params } }: any) => {
  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  return (
    <GroupChannelSettingsModule.Provider channel={channel}>
      <Header />
      <GroupChannelSettingsModule.Info />
      <GroupChannelSettingMenus />
    </GroupChannelSettingsModule.Provider>
  );
};

const Header = () => {
  const { HeaderComponent } = useHeaderStyle();
  const navigation = useNavigation<any>();

  const navigateToBack = () => {
    navigation.goBack();
  };

  return <HeaderComponent title="채팅방 정보" left={<Icon icon="arrow-left" />} onPressLeft={navigateToBack} />;
};

const GroupChannelSettingMenus = () => {
  const { sdk, sbOptions } = useSendbirdChat();
  const { channel } = useContext(GroupChannelSettingsContexts.Fragment);
  const { STRINGS } = useLocalization();
  const { colors } = useUIKitTheme();
  const toast = useToast();

  const { movePage } = useMovePage();

  const [isReport, setIsReport] = useState(false);
  useEffect(() => {
    if (isReport) {
      setTimeout(() => {}, 1500);
      channel.leave().then(() => {
        navigateToGroupChannelListScreen();
        sdk.clearCachedMessages([channel.url]).catch();
      });
    }
  }, [isReport]);
  const reportBottomSheet = useBottomSheet();
  const reportSnapPoints = useMemo(() => ['78%'], []);

  const { toggle, isOpen } = useToggle();

  const navigateToGroupChannelListScreen = () => {};

  const exitChannel = (channel: SendbirdGroupChannel) => {
    channel.leave().then(() => {
      navigateToGroupChannelListScreen();
      sdk.clearCachedMessages([channel.url]).catch();
    });
  };

  const toggleNotification = async () => {
    if (channel.myPushTriggerOption === 'off') {
      await channel.setMyPushTriggerOption(PushTriggerOption.DEFAULT);
    } else {
      await channel.setMyPushTriggerOption(PushTriggerOption.OFF);
    }
  };

  const { onPressNotificationMenu, actionLabelNotificationMenu, actionItemNotificationMenu } = useIIFE(() => {
    const getNotificationsLabel = () => {
      switch (channel.myPushTriggerOption) {
        case PushTriggerOption.ALL:
        case PushTriggerOption.DEFAULT:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_ON;
        case PushTriggerOption.OFF:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_OFF;
        case PushTriggerOption.MENTION_ONLY:
          return STRINGS.GROUP_CHANNEL_SETTINGS.MENU_NOTIFICATION_LABEL_MENTION_ONLY;
      }
    };

    return {
      actionLabelNotificationMenu: getNotificationsLabel(),
      actionItemNotificationMenu: conditionChaining(
        [false /*sbOptions.uikit.groupChannel.channel.enableMention*/],
        [
          <Icon icon={'chevron-right'} color={colors.onBackground01} />,
          <Switch value={channel.myPushTriggerOption !== 'off'} onChangeValue={toggleNotification} />,
        ],
      ),
      onPressNotificationMenu: () => {
        // if (sbOptions.uikit.groupChannel.channel.enableMention) navigateToGroupChannelNotificationScreen?.();
        // else
        toggleNotification();
      },
    };
  });

  const members = channel.members;
  const currentUser = sdk.currentUser;
  // @ts-ignore
  const otherMember = members.find((member) => member.userId !== currentUser.userId);
  // if (!otherMember) return null;
  // @ts-ignore
  const otherMemberId = otherMember ? otherMember.userId : '0';

  const defaultMenuItems: MenuBarProps[] = [
    {
      icon: icons.bellChat,
      name: '알림',
      onPress: onPressNotificationMenu,
      actionLabel: actionLabelNotificationMenu,
      actionItem: actionItemNotificationMenu,
    },
    {
      icon: icons.libraryChat,
      name: '서재 구경하기',
      onPress: otherMember
        ? movePage('library', {
            memberId: otherMemberId,
            isYourLibrary: true,
          })
        : () => {
            toast.show('상대방이 없어 서재를 조회할 수 없습니다', 'error');
          },
    },
    {
      icon: icons.reportChat,
      name: '신고하기',
      onPress: otherMember
        ? () => {
            // FIXME - 한결: 첫 화면 렌더링시에 동작하지 않고, 화면에서 다른 행동을 해야지만 동작함. 원인 무엇..???
            reportBottomSheet.handleOpenBottomSheet();
          }
        : () => {
            toast.show('상대방이 없어 신고가 불가능합니다', 'error');
          },
    },
  ];

  defaultMenuItems.push({
    icon: icons.exitChat,
    iconColor: colors.error,
    name: '채팅방 나가기',
    onPress: () => {
      toggle();
    },
  });

  const menuItemsCreator = (menu: MenuBarProps[]) => menu;
  const menuItems = menuItemsCreator(defaultMenuItems);

  return (
    <View>
      <View>
        {menuItems.map((menu) => {
          return (
            <MenuBar
              key={menu.name}
              onPress={menu.onPress}
              name={menu.name}
              disabled={menu.disabled}
              visible={menu.visible}
              icon={menu.icon}
              iconColor={menu.iconColor}
              iconBackgroundColor={menu.iconBackgroundColor}
              actionLabel={menu.actionLabel}
              actionItem={menu.actionItem}
            />
          );
        })}
      </View>
      <LeaveChannelModal visible={isOpen} onClose={toggle} onConfirm={() => exitChannel(channel)} />
      <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
        <ReportOption
          bottomClose={reportBottomSheet.handleCloseBottomSheet}
          reportedMemberId={parseInt(otherMemberId, 10)}
          setIsReported={setIsReport}
        />
      </CustomBottomSheetModal>
    </View>
  );
};

const MenuBar = ({
  variant = 'default',
  disabled,
  visible = true,
  onPress,
  name,
  icon,
  iconColor,
  iconBackgroundColor,
  actionLabel,
  actionItem = null,
}: MenuBarProps) => {
  const { palette, colors } = useUIKitTheme();

  if (!visible) return null;

  return (
    <View>
      <Pressable disabled={disabled} onPress={onPress} style={styles.container}>
        {icon && <Image source={icon} resizeMode="contain" style={styles.icon} />}
        <Text subtitle2 numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        {Boolean(actionLabel) && (
          <Text subtitle2 numberOfLines={1} color={colors.onBackground02} style={styles.actionLabel}>
            {actionLabel}
          </Text>
        )}
        {actionItem}
      </Pressable>
    </View>
  );
};

const styles = createStyleSheet({
  container: {
    marginLeft: 20,
    marginRight: 20,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    flex: 1,
    marginRight: 8,
  },
  icon: {
    marginRight: 16,
    width: 24,
    height: 24,
  },
  containedIcon: {
    borderRadius: 24,
    padding: 4,
  },
  actionLabel: {
    marginRight: 4,
  },
});
