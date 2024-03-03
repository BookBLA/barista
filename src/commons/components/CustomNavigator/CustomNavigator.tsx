import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { TapScreens } from '../TapComponent/TapScreens';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import Matching from '../../../screens/Matching/Matching';
import { Platform, SafeAreaView } from 'react-native';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'example02', component: CustomScreen(Example02) },
  { name: 'matching', component: CustomScreen(Matching) },
];

export const CustomNavigator = () => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: 16,
        marginTop: Platform.OS === 'android' ? 50 : 0,
      }}
    >
      <Stack.Navigator initialRouteName="tapScreens" screenOptions={{ headerShown: false }}>
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </SafeAreaView>
  );
};
