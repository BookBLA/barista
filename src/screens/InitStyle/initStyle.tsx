import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import CommStyle from './units/CommStyle';
import DateCost from './units/DateCost';
import Mbti from './units/Mbti';
import MyHeight from './units/MyHeight';
import OppositeSex from './units/OppositeSex';
import PersonalQuestion from './units/PersonalQuestion';
import SmokeDrink from './units/SmokeDrink';

const Stack = createStackNavigator();

const screens = [
  { name: 'mbti', component: Mbti },
  { name: 'smokeDrink', component: SmokeDrink },
  { name: 'oppositeSex', component: OppositeSex },
  { name: 'commStyle', component: CommStyle },
  { name: 'dateCost', component: DateCost },
  { name: 'myHeight', component: MyHeight },
  { name: 'personalQuestion', component: PersonalQuestion },
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
