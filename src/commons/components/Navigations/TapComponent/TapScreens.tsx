import homeBright from '@assets/images/icons/HomeBright.png';
import homeDark from '@assets/images/icons/HomeDark.png';
import libraryBright from '@assets/images/icons/LibraryBright.png';
import libraryDark from '@assets/images/icons/LibraryDark.png';
import { colors } from '@commons/styles/variablesStyles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { CommonActions } from '@react-navigation/native';
import ChatStack from '@screens/Chat/ChatStack';
import HomeStack from '@screens/Home/HomeStack';
import LibraryStack from '@screens/Library/LibraryStack';
import MatchingStack from '@screens/Matching/MatchingStack';
import { Image, Platform } from 'react-native';

const TapScreens = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: 'fontMedium',
          color: colors.textGray5,
          paddingBottom: 2,
        },
        tabBarStyle: {
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
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? homeDark : homeBright} resizeMode="contain" style={{ width: 21, height: 21 }} />
          ),
          unmountOnBlur: true,
          lazy: true,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault(); // Prevent default behavior
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: 'HomeStack', params: { screen: 'home' } }], // Reset to HomeStack with home screen
              }),
            );
          },
        })}
      />
      <Tab.Screen
        name="Matching"
        component={MatchingStack}
        options={{
          tabBarLabel: '우편함',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.postboxDark : icons.postboxBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
          unmountOnBlur: true,
          lazy: true,
        }}
      />
      <Tab.Screen
        name="chat"
        component={ChatStack}
        options={{
          tabBarLabel: '채팅',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? icons.chatDark : icons.chatBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
          unmountOnBlur: true,
          lazy: true,
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryStack}
        options={{
          tabBarLabel: '내 서재',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? libraryDark : libraryBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
          unmountOnBlur: true,
          lazy: true,
        }}
      />
    </Tab.Navigator>
  );
};

export default TapScreens;
