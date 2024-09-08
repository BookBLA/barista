import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '@screens/Chat/Chat';
import Library from '@screens/Library/Library';
import React from 'react';
import Home from './screens/Home/Home';
import Product from './screens/Product/Product';

const Stack = createStackNavigator();

const screens = [
  { name: 'home', component: Home },
  { name: 'product', component: Product },
  { name: 'library', component: Library },
  { name: 'chat', component: Chat },
];

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false, animationEnabled: false, headerTransparent: true }}
    >
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
