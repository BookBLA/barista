import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import homeBright from '../../../../assets/images/icons/HomeBright.png';
import homeDark from '../../../../assets/images/icons/HomeDark.png';
import matchingDark from '../../../../assets/images/icons/MatchingDark.png';
import matchingBright from '../../../../assets/images/icons/MatchingBright.png';
import libraryDark from '../../../../assets/images/icons/LibraryDark.png';
import libraryBright from '../../../../assets/images/icons/LibraryBright.png';
import { colors } from '../../styles/variablesStyles';
import HomeStack from '../../../screens/Home/HomeStack';
import useManageMargin from '../../hooks/useManageMargin';
import MatchingStack from '../../../screens/Matching/MatchingStack';
import LibraryStack from '../../../screens/Library/LibraryStack';

const TapScreens = () => {
  const Tab = createBottomTabNavigator();
  useManageMargin();

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
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarLabel: '홈',
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? homeDark : homeBright} resizeMode="contain" style={{ width: 21, height: 21 }} />
          ),
          unmountOnBlur: true,
        }}
      />
      <Tab.Screen
        name="Matching"
        component={MatchingStack}
        options={{
          tabBarLabel: '매칭',
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? matchingDark : matchingBright}
              resizeMode="contain"
              style={{ width: 21, height: 21 }}
            />
          ),
          unmountOnBlur: true,
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
        }}
      />
    </Tab.Navigator>
  );
};

export default TapScreens;
