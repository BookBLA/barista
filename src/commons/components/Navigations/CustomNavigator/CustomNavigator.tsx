import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TapScreens from '../TapComponent/TapScreens';
import InitUserInfoStack from '../../../../screens/InitUserInfo/initUserinfo';
import CompletePage from '../../../../screens/InitUserInfo/units/CompletePage';
import InfoOpenChat from '../../../../screens/InitUserInfo/units/InfoOpenChat';
import FailedSign from '../../../../screens/InitUserInfo/units/FailedSign';
import InitStyleStack from '../../../../screens/InitStyle/initStyle';
import InitBookStack from '../../../../screens/InitBook/initBookStack';
import SettingStack from '../../../../screens/Setting/SettingStack';
import LoginStack from '../../../../screens/Login/LoginStack';
import { CustomScreen } from '../../Layouts/CustomScreen/CustomScreen';
import Notice from '../../../../screens/Notice/Notice';
import WaitConfirm from '../../../../screens/InitUserInfo/units/WaitConfirm';
import { useHasMargin } from '../../../store/ui/hasMargin/useHasMargin';
import { useAuthNavigation } from '../../../hooks/navigations/authNavigation/useAuthNavigation';
import { useInitialRouteName } from '../../../hooks/navigations/initialRouteName/useInitialRouteName';

const Stack = createNativeStackNavigator();
const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'initUserinfoStack', component: InitUserInfoStack },
  { name: 'completePage', component: CompletePage },
  { name: 'infoOpenChat', component: InfoOpenChat },
  { name: 'failedSign', component: FailedSign },
  { name: 'initStyleStack', component: InitStyleStack },
  { name: 'initBookStack', component: InitBookStack },
  { name: 'settingStack', component: SettingStack },
  { name: 'loginStack', component: LoginStack },
  { name: 'notice', component: CustomScreen(Notice) },
  { name: 'waitConfirm', component: WaitConfirm },
];

export const CustomNavigator = () => {
  const hasMargin = useHasMargin((state) => state.hasMargin);
  const navigationRef = useAuthNavigation();
  const getInitialRouteName = useInitialRouteName();

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: 'white',
          marginHorizontal: hasMargin ? 16 : 0,
          marginTop: Platform.OS === 'android' ? getStatusBarHeight() : 0,
        }}
      >
        <Stack.Navigator initialRouteName={getInitialRouteName()} screenOptions={{ headerShown: false }}>
          {screens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
