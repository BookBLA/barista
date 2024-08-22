import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import { createStackNavigator } from '@react-navigation/stack';
import Library from '@screens/Library/Library';
import React from 'react';
import Home from './screens/Home/Home';
import Product from './screens/Product/Product';
import Quiz from '@screens/Home/screens/Quiz/Quiz';

const Stack = createStackNavigator();
const screens = [
  { name: 'home', component: Home },
  { name: 'product', component: Product },
  { name: 'library', component: Library },
  { name: 'quiz', component: Quiz },
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
