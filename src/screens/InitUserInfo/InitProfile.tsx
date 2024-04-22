import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import CompletePage from './units/CompletePage';
import ProfileImage from './units/ProfileImage';
import OpenChatLink from './units/OpenChatLink';
import WaitConfirm from './units/WaitConfirm';
import InfoOpenChat from './units/InfoOpenChat';
import useManageMargin from '../../commons/hooks/useManageMargin';
import FailedSign from './units/FailedSign';

const Stack = createStackNavigator();

const screens = [
  { name: 'profileImage', component: ProfileImage },
  { name: 'openChatLink', component: OpenChatLink },
  { name: 'waitConfirm', component: WaitConfirm },
  { name: 'completePage', component: CompletePage },
  { name: 'infoOpenChat', component: InfoOpenChat },
  { name: 'failedSign', component: FailedSign },
];

const InitProfileStack = () => {
  useManageMargin();
  return (
    <Stack.Navigator initialRouteName="profileImage" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default InitProfileStack;
