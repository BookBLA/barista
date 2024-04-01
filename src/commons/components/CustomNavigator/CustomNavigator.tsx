import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useHasMargin } from '../../store/useHasMargin';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, SafeAreaView } from 'react-native';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { TRootStackParamList } from './CustomNavigator.types';
import TapScreens from '../TapComponent/TapScreens';
import Example from '../../../screens/Example/Example';
import Example03 from '../../../screens/Example03/Example03';
import InitStyleStack from '../../../screens/InitStyle/initStyle';
import InitUserInfoStack from '../../../screens/InitUserInfo/initUserinfo';
import InitBookStack from '../../../screens/InitBook/initBook';
import Kakao from '../../../screens/Login/KakaoLogin';
import Login from '../../../screens/Login/Login';
import Matching from '../../../screens/Matching/Matching';
import ReceivePostcardDetail from '../../../screens/Matching/Postcard/Receive/ReceivePostcardDetail';
import TermsOfService from '../../../screens/TermsOfService/TermsOfService';
import SettingStack from '../../../screens/Setting/SettingStack';
import InitProfileStack from '../../../screens/InitUserInfo/InitProfile';
import useAuthStore from '../../store/useAuthStore';
import Example04 from '../../../screens/Example04/Example04';
import ModifyUserinfo from '../../../screens/InitUserInfo/ModifyUserinfo';

const Stack = createNativeStackNavigator();
const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'initUserinfoStack', component: InitUserInfoStack },
  { name: 'initProfileStack', component: InitProfileStack },
  { name: 'initStyleStack', component: InitStyleStack },
  { name: 'initBookStack', component: InitBookStack },
  { name: 'settingStack', component: SettingStack },
  { name: 'login', component: CustomScreen(Login) },
  { name: 'kakao', component: CustomScreen(Kakao) },
  { name: 'termsOfService', component: CustomScreen(TermsOfService) },
  { name: 'receivePostcardDetail', component: CustomScreen(ReceivePostcardDetail) },
  { name: 'matching', component: CustomScreen(Matching) },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'example03', component: CustomScreen(Example03) },
  { name: 'example04', component: CustomScreen(Example04) },
  { name: 'modifyUserinfo', component: ModifyUserinfo },
];

export const CustomNavigator = () => {
  const { hasMargin } = useHasMargin();
  const { token } = useAuthStore();
  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null);

  useEffect(() => {
    // 토큰이 없을 경우 로그인 페이지로 이동하기 위해 사용
    if (!token && navigationRef.current) {
      navigationRef.current.navigate('login');
    }
  }, [token]);

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
        <Stack.Navigator initialRouteName="modifyUserinfo" screenOptions={{ headerShown: false }}>
          {screens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
