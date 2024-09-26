import { Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  useSendbirdChat,
  createGroupChannelListFragment,
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  useConnection,
  SendbirdUIKitContainer,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';
import React, { useEffect, useRef } from 'react';
import { platformServices } from '@screens/Chat/NativeModule';
import { MMKV } from 'react-native-mmkv';
import { LoadingWrapper, Spinner } from '@screens/Chat/ChatStack.style';
import { Easing } from 'react-native-reanimated';
import { getMemberProfileApi } from '@commons/api/members/profile/memberProfile.api';

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

const GroupChannelListScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <GroupChannelListFragment
      onPressCreateChannel={(channelType) => {
        // Navigate to GroupChannelCreate function.
        navigation.navigate('GroupChannelCreate', { channelType });
      }}
      onPressChannel={(channel) => {
        // Navigate to GroupChannel function.
        navigation.navigate('GroupChannel', { channelUrl: channel.url });
      }}
    />
  );
};

const GroupChannelCreateScreen = () => {
  const navigation = useNavigation<any>();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async (channel) => {
        // Navigate to GroupChannel function.
        navigation.replace('GroupChannel', { channelUrl: channel.url });
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
    />
  );
};

const GroupChannelScreen = () => {
  const navigation = useNavigation<any>();
  const { params } = useRoute<any>();

  const { sdk } = useSendbirdChat();
  const { channel } = useGroupChannel(sdk, params.channelUrl);
  if (!channel) return null;

  return (
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
  );
};

const callGetMemberProfileApi = async () => {
  try {
    const response: any = await getMemberProfileApi().then(() => {
      return response.result;
    });
  } catch (error) {
    console.error(error);
  }
};

const SignInScreen = () => {
  const { connect } = useConnection();
  const userInfo = callGetMemberProfileApi();

  connect('blabla', { nickname: 'Hangyeol Seo' });

  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true, // This enables hardware acceleration
        easing: Easing.inOut(Easing.ease),
      }),
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <LoadingWrapper>
      <Animated.View style={{ transform: [{ rotate: spin }] }}>
        <Spinner />
      </Animated.View>
    </LoadingWrapper>
  );
};

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { currentUser } = useSendbirdChat();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : (
        <>
          <Stack.Screen name={'GroupChannelList'} component={GroupChannelListScreen} />
          <Stack.Screen name={'GroupChannelCreate'} component={GroupChannelCreateScreen} />
          <Stack.Screen name={'GroupChannel'} component={GroupChannelScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const mmkv = new MMKV();
export default function ChatStack() {
  return (
    <SendbirdUIKitContainer
      appId={`${process.env.EXPO_PUBLIC_SENDBIRD_APP_ID}`}
      chatOptions={{ localCacheStorage: mmkv }}
      platformServices={platformServices}
    >
      <Navigation />
    </SendbirdUIKitContainer>
  );
}
