import React from 'react';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../../../screens/Home/Home';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';

const Stack = createNativeStackNavigator();

export const CustomNavigator = ({ ...rest }) => {
  const screens = [
    { name: 'home', component: Home },
    { name: 'example', component: Example },
    { name: 'example02', component: Example02 },
  ];

  return (
    <Stack.Navigator {...rest} screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};
