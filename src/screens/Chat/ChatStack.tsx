import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignInScreen } from '@screens/Chat/screens/SignInScreen';
import { GroupChannelListScreen } from '@screens/Chat/screens/GroupChannelListScreen';
import { GroupChannelCreateScreen } from '@screens/Chat/screens/GroupChannelCreateScreen';
import { GroupChannelScreen } from '@screens/Chat/screens/GroupChannelScreen';
import { GroupChannelSettingsScreen } from '@screens/Chat/screens/GroupChannelSettingsScreen';
import Library from '@screens/Library/Library';
import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';

import { useSendbirdChat } from '@sendbird/uikit-react-native';

const Stack = createNativeStackNavigator();
const Navigation = () => {
  const { currentUser } = useSendbirdChat();

  return (
    <Stack.Navigator initialRouteName="GroupChannelList" screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <Stack.Screen name="SignIn" component={SignInScreen} />
      ) : (
        <>
          <Stack.Screen name="GroupChannelList" component={GroupChannelListScreen} />
          {/*<Stack.Screen name="GroupChannelCreate" component={GroupChannelCreateScreen} />*/}
          <Stack.Screen name="GroupChannel" component={GroupChannelScreen} />
          <Stack.Screen name="GroupChannelSettings" component={GroupChannelSettingsScreen} />
          <Stack.Screen name="library" component={CustomScreen(Library)} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default function ChatStack() {
  return <Navigation />;
}
