import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import TermsOfService from '../TermsOfService/TermsOfService';
import EmailAuth from './units/EmailAuth';
import GenderBirth from './units/GenderBirth';
import InfoOpenChat from './units/InfoOpenChat';
import InsertInviteCode from './units/InsertInviteCode';
import InviteFriends from './units/InviteFriends';
import NamePhone from './units/NamePhone';
import OpenChatLink from './units/OpenChatLink';
import ProfileImage from './units/ProfileImage';
import SchoolStudentID from './units/SchoolStudentID';

const Stack = createStackNavigator();

const screens = [
  { name: 'termsOfService', component: TermsOfService },
  { name: 'insertInviteCode', component: InsertInviteCode },
  { name: 'genderBirth', component: GenderBirth },
  { name: 'namePhone', component: NamePhone },
  { name: 'schoolStudentID', component: SchoolStudentID },
  { name: 'emailAuth', component: EmailAuth },
  { name: 'profileImage', component: ProfileImage },
  { name: 'openChatLink', component: OpenChatLink },
  { name: 'infoOpenChat', component: InfoOpenChat },
  { name: 'inviteFriends', component: InviteFriends },
];

const InitUserInfoStack = () => {
  useManageMargin();
  return (
    <Stack.Navigator initialRouteName="termsOfService" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default InitUserInfoStack;
