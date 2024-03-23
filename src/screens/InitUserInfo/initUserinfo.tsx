import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import GenderBirth from './units/GenderBirth';
import NamePhone from './units/NamePhone';
import SchoolStudentID from './units/SchoolStudentID';
import EmailAuth from './units/EmailAuth';
import CompletePage from './units/CompletePage';
import ProfileImage from './units/ProfileImage';
import OpenChatLink from './units/OpenChatLink';
import WaitConfirm from './units/WaitConfirm';
import InfoOpenChat from './units/InfoOpenChat';

const Stack = createStackNavigator();

const screens = [
  { name: 'genderBirth', component: GenderBirth },
  { name: 'namePhone', component: NamePhone },
  { name: 'schoolStudentID', component: SchoolStudentID },
  { name: 'emailAuth', component: EmailAuth },
  { name: 'profileImage', component: ProfileImage },
  { name: 'openChatLink', component: OpenChatLink },
  { name: 'waitConfirm', component: WaitConfirm },
  { name: 'completePage', component: CompletePage },
  { name: 'infoOpenChat', component: InfoOpenChat },
];

const InitUserInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="waitConfirm" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default InitUserInfoStack;
