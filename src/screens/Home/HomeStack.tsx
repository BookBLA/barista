import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import Product from './screens/Product/Product';
import Home from './screens/Home/Home';
import Library from '../Library/Library';
import usePushNotifications from '../../commons/hooks/notifications/pushNotifications/usePushNotifications';

const Stack = createStackNavigator();
const screens = [
  { name: 'home', component: Home },
  { name: 'product', component: Product },
  { name: 'library', component: Library },
];

const HomeStack = () => {
  usePushNotifications();

  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false, animationEnabled: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
