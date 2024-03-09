import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { TapScreens } from '../TapComponent/TapScreens';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import Matching from '../../../screens/Matching/Matching';
import { Platform, SafeAreaView } from 'react-native';
import Example03 from '../../../screens/Example03/Example03';
import InitStyleStack from '../../../screens/InitStyle/initStyle';
import InitUserInfoStack from '../../../screens/InitUserInfo/initUserinfo';
import { useHasMargin } from '../../store/useHasMargin';
import { getStatusBarHeight } from 'react-native-status-bar-height';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'example02', component: CustomScreen(Example02) },
  { name: 'matching', component: CustomScreen(Matching) },
  { name: 'example03', component: CustomScreen(Example03) },
  { name: 'initUserinfoStack', component: CustomScreen(InitUserInfoStack) },
  { name: 'initStyleStack', component: CustomScreen(InitStyleStack) },
];

export const CustomNavigator = () => {
  const { hasMargin } = useHasMargin();

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: 'white',
        marginHorizontal: hasMargin ? 16 : 0,
        marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
      }}
    >
      <Stack.Navigator initialRouteName="initUserinfoStack" screenOptions={{ headerShown: false }}>
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </SafeAreaView>
  );
};
