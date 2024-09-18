import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TermsOfService from '../TermsOfService/TermsOfService';
import EmailAuth from './screens/EmailAuth/EmailAuth';
import GenderBirth from './screens/GenderBirth/GenderBirth';
import InsertInviteCode from './screens/InsertInviteCode/InsertInviteCode';
import NamePhone from './screens/NamePhone/NamePhone';
import SchoolStudentID from './screens/SchoolStudentID/SchoolStudentID';

const Stack = createStackNavigator();

const screens = [
  { name: 'termsOfService', component: TermsOfService },
  { name: 'schoolStudentID', component: SchoolStudentID },
  { name: 'emailAuth', component: EmailAuth },
  { name: 'namePhone', component: NamePhone },
  { name: 'genderBirth', component: GenderBirth },
  { name: 'insertInviteCode', component: InsertInviteCode },

  // { name: 'profileImage', component: ProfileImage },
  // { name: 'openChatLink', component: OpenChatLink },
  // { name: 'infoOpenChat', component: InfoOpenChat },
];

const InitUserInfoStack = () => {
  useAppUIManager();
  return (
    <Stack.Navigator initialRouteName="termsOfService" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default InitUserInfoStack;
