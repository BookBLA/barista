import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Home/Home';
import { Image, Platform } from 'react-native';
import homeBright from '../../../../assets/images/icons/HomeBright.png';
import homeDark from '../../../../assets/images/icons/HomeDark.png';
import matchingDark from '../../../../assets/images/icons/MatchingDark.png';
import matchingBright from '../../../../assets/images/icons/MatchingBright.png';
import libraryDark from '../../../../assets/images/icons/LibraryDark.png';
import libraryBright from '../../../../assets/images/icons/LibraryBright.png';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { colors } from '../../styles/variablesStyles';

export const TapScreens = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="홈"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarStyle: {
          height: '8%',
          ...Platform.select({
            ios: {
              paddingTop: 10,
              paddingBottom: 15,
            },
            android: {
              paddingTop: 10,
              paddingBottom: 10,
            },
          }),
        },
      }}
    >
      <Tab.Screen
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? homeDark : homeBright} resizeMode="contain" style={{ width: 19, height: 17 }} />
          ),
        }}
      />
      <Tab.Screen
        name="매칭"
        component={Example}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? matchingDark : matchingBright}
              resizeMode="contain"
              style={{ width: 19, height: 17 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="내 서재"
        component={Example02}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? libraryDark : libraryBright}
              resizeMode="contain"
              style={{ width: 19, height: 17 }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
