import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import Mbti from './units/Mbti';
import SmokeDrink from './units/SmokeDrink';
import OppositeSex from './units/OppositeSex';
import CommStyle from './units/CommStyle';
import DateCost from './units/DateCost';
import PersonalQuestion from './units/PersonalQuestion';

const Stack = createStackNavigator();

const screens = [
  { name: 'mbti', component: Mbti },
  { name: 'smokeDrink', component: SmokeDrink },
  { name: 'oppositeSex', component: OppositeSex },
  { name: 'commStyle', component: CommStyle },
  { name: 'dateCost', component: DateCost },
  { name: 'personalQeustion', component: PersonalQuestion },
];

const InitStyleStack = () => {
  return (
    <Stack.Navigator initialRouteName="mbti" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default InitStyleStack;
