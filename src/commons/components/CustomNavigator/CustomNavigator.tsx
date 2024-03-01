import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { TapScreens } from '../TapComponent/TapScreens';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import GenderBirth from '../../../screens/InitUserInfo/GenderBirth';
import NamePhone from '../../../screens/InitUserInfo/NamePhone';
import SchoolStudentID from '../../../screens/InitUserInfo/SchoolStudentID';
import EmailAuth from '../../../screens/InitUserInfo/EmailAuth';
import CompletePage from '../../../screens/InitUserInfo/CompletePage';
import Mbti from '../../../screens/InitStyle/Mbti';
import SmokeDrink from '../../../screens/InitStyle/SmokeDrink';
import OppositeSex from '../../../screens/InitStyle/OppositeSex';
import CommStyle from '../../../screens/InitStyle/CommStyle';
import DateCost from '../../../screens/InitStyle/DateCost';
import PersonalQuestion from '../../../screens/InitStyle/PersonalQuestion';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'example02', component: CustomScreen(Example02) },
  { name: 'genderBirth', component: CustomScreen(GenderBirth) },
  { name: 'namePhone', component: CustomScreen(NamePhone) },
  { name: 'schoolStudentID', component: CustomScreen(SchoolStudentID) },
  { name: 'emailAuth', component: CustomScreen(EmailAuth) },
  { name: 'completePage', component: CustomScreen(CompletePage) },
  { name: 'mbti', component: CustomScreen(Mbti) },
  { name: 'smokeDrink', component: CustomScreen(SmokeDrink) },
  { name: 'oppositeSex', component: CustomScreen(OppositeSex) },
  { name: 'commStyle', component: CustomScreen(CommStyle) },
  { name: 'dateCost', component: CustomScreen(DateCost) },
  { name: 'personalQeustion', component: CustomScreen(PersonalQuestion) },
];

export const CustomNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="oppositeSex" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};
