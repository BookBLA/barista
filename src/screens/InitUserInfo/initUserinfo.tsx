import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/Layouts/CustomScreen/CustomScreen';
import GenderBirth from './units/GenderBirth';
import NamePhone from './units/NamePhone';
import SchoolStudentID from './units/SchoolStudentID';
import EmailAuth from './units/EmailAuth';
import ProfileImage from './units/ProfileImage';
import OpenChatLink from './units/OpenChatLink';
import InfoOpenChat from './units/InfoOpenChat';
import InviteFriends from './units/InviteFriends';
import TermsOfService from '../TermsOfService/TermsOfService';
import InsertInviteCode from './units/InsertInviteCode';
import useManageMargin from '../../commons/hooks/ui/manageMargin/useManageMargin';

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
