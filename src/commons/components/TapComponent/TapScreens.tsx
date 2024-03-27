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
import MyLibrary from '../../../screens/MyLibrary/MyLibrary';

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
        name="홈"
        component={Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image source={focused ? homeDark : homeBright} resizeMode="contain" style={{ width: 21, height: 21 }} />
          ),
        }}
      />
      <Tab.Screen
        name="매칭"
        component={Matching}
        options={{
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
        name="내 서재"
        component={MyLibrary}
        options={{
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
