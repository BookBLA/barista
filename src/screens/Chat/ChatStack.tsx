import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSendbirdChat, SendbirdUIKitContainer } from '@sendbird/uikit-react-native';
import { SignInScreen } from '@screens/Chat/screens/SignInScreen';
import { GroupChannelListScreen } from '@screens/Chat/screens/GroupChannelListScreen';
import { GroupChannelCreateScreen } from '@screens/Chat/screens/GroupChannelCreateScreen';
import { GroupChannelScreen } from '@screens/Chat/screens/GroupChannelScreen';
import { platformServices } from '@screens/Chat/NativeModule';
import { MMKV } from 'react-native-mmkv';

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
