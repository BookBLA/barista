import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Mbti from './screens/Mbti/Mbti';
import MyHeight from './screens/MyHeight/MyHeight';
import SelectProfile from './screens/SelectProfile/SelectProfile';
import SmokeDrink from './screens/SmokeDrink/SmokeDrink';

const Stack = createStackNavigator();

const screens = [
  { name: 'mbti', component: Mbti },
  { name: 'smokeDrink', component: SmokeDrink },
  // { name: 'oppositeSex', component: OppositeSex },
  // { name: 'commStyle', component: CommStyle },
  // { name: 'dateCost', component: DateCost },
  { name: 'myHeight', component: MyHeight },
  // { name: 'personalQuestion', component: PersonalQuestion },
  { name: 'selectProfile', component: SelectProfile },
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
