import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';

const Stack = createStackNavigator();

const screens = [{ name: 'mbti', component: Mbti }];

const InitBookStack = () => {
  return (
    <Stack.Navigator initialRouteName="mbti" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default InitBookStack;
