import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Setting from './units/Setting/Setting';
import Account from './units/Account/Account';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';

const Stack = createStackNavigator();
const screens = [
  { name: 'setting', component: Setting },
  { name: 'account', component: Account },
];

const SettingStack = () => {
  return (
    <Stack.Navigator initialRouteName="setting" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default SettingStack;
