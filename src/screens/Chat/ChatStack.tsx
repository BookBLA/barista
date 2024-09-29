import { Animated } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSendbirdChat, useConnection, SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
import { GroupChannelListScreen } from '@screens/Chat/screens/GroupChannelListScreen';
import { GroupChannelCreateScreen } from '@screens/Chat/screens/GroupChannelCreateScreen';
import { GroupChannelScreen } from '@screens/Chat/screens/GroupChannelScreen';
import React, { useEffect, useRef } from 'react';
import { platformServices } from '@screens/Chat/NativeModule';
import { MMKV } from 'react-native-mmkv';
import { LoadingWrapper, Spinner } from '@screens/Chat/ChatStack.style';
import { Easing } from 'react-native-reanimated';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';

const SignInScreen = () => {
  const showToast = useToastStore((state) => state.showToast);

  const { connect } = useConnection();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const memberName = useMemberStore((state) => state.memberInfo.name);
  const accessToken = useAuthStore((state) => state.token);
  // console.log(memberId, typeof memberId, memberName, typeof memberName, accessToken, typeof accessToken);

  if (memberId && memberName && accessToken) {
    connect(memberId.toString(), { nickname: memberName, accessToken: accessToken }).catch((error) => {
      showToast({
        content: '채팅 서버에 접속할 수 없습니다.\n다시 시도하거나 앱을 종료 후 재실행해주세요.',
      });
    });
  } else {
    showToast({
      content: '채팅 서버에 접속할 수 없습니다.\n다시 시도하거나 앱을 종료 후 재실행해주세요.',
    });
  }

  // 로딩 애니메이션
  const spinValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
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
          <Stack.Screen name="GroupChannelList" component={GroupChannelListScreen} />
          <Stack.Screen name="GroupChannelCreate" component={GroupChannelCreateScreen} />
          <Stack.Screen name="GroupChannel" component={GroupChannelScreen} />
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
