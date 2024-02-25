import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { TapScreens } from '../TapComponent/TapScreens';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import Login from '../../../screens/Login/Login';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'example02', component: CustomScreen(Example02) },
  { name: 'login', component: CustomScreen(Login) },
];

export const CustomNavigator = () => {
  const [accessToken, setAccessToken] = useState(true);

  return accessToken ? (
    <Stack.Navigator initialRouteName="tapScreens" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  ) : (
    <Stack.Navigator initialRouteName="login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" component={CustomScreen(Login)} />
    </Stack.Navigator>
  );
};
