import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../../../screens/Home/Home';
import { Image } from 'react-native';
import homeIcon from '../../../../assets/images/icons/home.png';
import matchingIcon from '../../../../assets/images/icons/matching.png';
import libraryIcon from '../../../../assets/images/icons/library.png';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';

export const TapScreens = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="home"
        component={Home}
        options={{
          tabBarIcon: () => <Image source={homeIcon} resizeMode="contain" />,
        }}
      />
      <Tab.Screen
        name="matching"
        component={Example}
        options={{
          tabBarIcon: () => <Image source={matchingIcon} resizeMode="contain" />,
        }}
      />
      <Tab.Screen
        name="library"
        component={Example02}
        options={{
          tabBarIcon: () => <Image source={libraryIcon} resizeMode="contain" />,
        }}
      />
    </Tab.Navigator>
  );
};
