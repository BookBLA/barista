import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import Product from './screens/Product/Product';
import Home from './screens/Home/Home';
import useHeaderControl from '../../commons/hooks/useHeaderControl';
import Header from './screens/Home/units/Header/Header';

const Stack = createStackNavigator();
const screens = [
  { name: 'home', component: Home },
  { name: 'product', component: Product },
];

const HomeStack = () => {
  useHeaderControl({
    free: <Header />,
  });

  return (
    <Stack.Navigator initialRouteName="home" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default HomeStack;
