import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Home/Home';
import { Image, Platform } from 'react-native';
import homeBright from '../../../../assets/images/icons/HomeBright.png';
import homeDark from '../../../../assets/images/icons/HomeDark.png';
import matchingDark from '../../../../assets/images/icons/MatchingDark.png';
import matchingBright from '../../../../assets/images/icons/MatchingBright.png';
import libraryDark from '../../../../assets/images/icons/LibraryDark.png';
import libraryBright from '../../../../assets/images/icons/LibraryBright.png';
import { colors } from '../../styles/variablesStyles';
import Matching from '../../../screens/Matching/Matching';
import Library from '../../../screens/Library/Library';

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
            ios: {},
            android: {
              paddingTop: 8,
              paddingBottom: 10,
            },
          }),
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? homeDark : homeBright} resizeMode="contain" style={{ width: 21, height: 21 }} />
          ),
        }}
      />
      <Tab.Screen
        name="Matching"
        component={Matching}
        options={{
          tabBarLabel: '매칭',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? matchingDark : matchingBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Library"
        component={Library}
        options={{
          tabBarLabel: '내 서재',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? libraryDark : libraryBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="OtherLibrary"
        component={Library}
        options={{
          tabBarButton: () => null,
        }}
      />
    </Tab.Navigator>
  );
};

export default TapScreens;
