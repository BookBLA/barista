import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import GenderBirth from './units/GenderBirth';
import NamePhone from './units/NamePhone';
import SchoolStudentID from './units/SchoolStudentID';
import EmailAuth from './units/EmailAuth';

const Stack = createStackNavigator();

const screens = [
  { name: 'genderBirth', component: GenderBirth },
  { name: 'namePhone', component: NamePhone },
  { name: 'schoolStudentID', component: SchoolStudentID },
  { name: 'emailAuth', component: EmailAuth },
];

const InitUserInfoStack = () => {
  return (
    <Stack.Navigator initialRouteName="genderBirth" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default InitUserInfoStack;
