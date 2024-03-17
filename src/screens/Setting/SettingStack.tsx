import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './units/Setting/Setting';
import Account from './units/Account/Account';

const Stack = createStackNavigator();
const screens = [
  { name: 'setting', component: Setting },
  { name: 'account', component: Account },
];

const SettingStack = () => {
  return (
    <Stack.Navigator initialRouteName="addBook" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default SettingStack;
