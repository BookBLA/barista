import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useHasMargin } from '../../store/useHasMargin';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, SafeAreaView } from 'react-native';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import { NavigationContainer } from '@react-navigation/native';
import { useAuthNavigation } from '../../hooks/useAuthNavigation';
import { useInitialRouteName } from '../../hooks/useInitialRouteName';
import TapScreens from '../TapComponent/TapScreens';
import InitStyleStack from '../../../screens/InitStyle/initStyle';
import InitUserInfoStack from '../../../screens/InitUserInfo/initUserinfo';
import InitBookStack from '../../../screens/InitBook/initBookStack';
import TermsOfService from '../../../screens/TermsOfService/TermsOfService';
import SettingStack from '../../../screens/Setting/SettingStack';
import Notice from '../../../screens/Notice/Notice';
import ModifyUserinfo from '../../../screens/InitUserInfo/ModifyUserinfo';
import ModifyStyle from '../../../screens/InitStyle/ModifyStyle';
import InfoOpenChat from '../../../screens/InitUserInfo/units/InfoOpenChat';
import ProfileImage from '../../../screens/InitUserInfo/units/ProfileImage';
import WaitConfirm from '../../../screens/InitUserInfo/units/WaitConfirm';
import CompletePage from '../../../screens/InitUserInfo/units/CompletePage';
import FailedSign from '../../../screens/InitUserInfo/units/FailedSign';
import OpenChatLink from '../../../screens/InitUserInfo/units/OpenChatLink';
import LoginStack from '../../../screens/Login/LoginStack';

const Stack = createNativeStackNavigator();
const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'initUserinfoStack', component: InitUserInfoStack },
  { name: 'profileImage', component: ProfileImage },
  { name: 'openChatLink', component: OpenChatLink },
  { name: 'waitConfirm', component: WaitConfirm },
  { name: 'completePage', component: CompletePage },
  { name: 'infoOpenChat', component: InfoOpenChat },
  { name: 'failedSign', component: FailedSign },
  { name: 'initStyleStack', component: InitStyleStack },
  { name: 'initBookStack', component: InitBookStack },
  { name: 'settingStack', component: SettingStack },
  { name: 'loginStack', component: LoginStack },
  { name: 'termsOfService', component: CustomScreen(TermsOfService) },
  { name: 'notice', component: CustomScreen(Notice) },
  { name: 'modifyUserinfo', component: ModifyUserinfo },
  { name: 'modifyStyle', component: CustomScreen(ModifyStyle) },
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
        {/* <Stack.Navigator initialRouteName="notice" screenOptions={{ headerShown: false }}> */}
        <Stack.Navigator initialRouteName={getInitialRouteName()} screenOptions={{ headerShown: false }}>
          {screens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
