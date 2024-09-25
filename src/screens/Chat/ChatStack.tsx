import { Pressable, Text, View } from 'react-native';
import { MMKV } from 'react-native-mmkv';
import { platformServices } from '@screens/Chat/NativeModule';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNavigation, useRoute, NavigationContainer } from '@react-navigation/native';
import {
  SendbirdUIKitContainer,
  useSendbirdChat,
  createGroupChannelListFragment,
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  useConnection,
} from '@sendbird/uikit-react-native';
import { useGroupChannel } from '@sendbird/uikit-chat-hooks';

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

const SignInScreen = () => {
  const { connect } = useConnection();

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable
        style={{
          width: 120,
          height: 30,
          backgroundColor: '#742DDD',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        // TODO: Use the ID of a user you've created on the dashboard.
        // If there isn't one, specify a unique ID so that a new user can be created with the value.
        onPress={() => connect('blabla', { nickname: 'Hangyeol Seo' })}
      >
        <Text>Sign in</Text>
      </Pressable>
    </View>
  );
};

const mmkv = new MMKV();
const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const { currentUser } = useSendbirdChat();

  return (
    <RootStack.Navigator screenOptions={{ headerShown: false }}>
      {!currentUser ? (
        <RootStack.Screen name={'SignIn'} component={SignInScreen} />
      ) : (
        <>
          <RootStack.Screen name={'GroupChannelList'} component={GroupChannelListScreen} />
          <RootStack.Screen name={'GroupChannelCreate'} component={GroupChannelCreateScreen} />
          <RootStack.Screen name={'GroupChannel'} component={GroupChannelScreen} />
        </>
      )}
    </RootStack.Navigator>
  );
};

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
