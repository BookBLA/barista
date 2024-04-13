import React, { useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useHasMargin } from '../../store/useHasMargin';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, SafeAreaView } from 'react-native';
import { CustomScreen } from '../CustomScreen/CustomScreen';
import { NavigationContainer, NavigationContainerRef } from '@react-navigation/native';
import { TRootStackParamList } from './CustomNavigator.types';
import TapScreens from '../TapComponent/TapScreens';
import InitStyleStack from '../../../screens/InitStyle/initStyle';
import InitUserInfoStack from '../../../screens/InitUserInfo/initUserinfo';
import InitBookStack from '../../../screens/InitBook/initBook';
import Kakao from '../../../screens/Login/KakaoLogin';
import Login from '../../../screens/Login/Login';
import ReceivePostcardDetail from '../../../screens/Matching/Postcard/Receive/ReceivePostcardDetail';
import TermsOfService from '../../../screens/TermsOfService/TermsOfService';
import SettingStack from '../../../screens/Setting/SettingStack';
import InitProfileStack from '../../../screens/InitUserInfo/InitProfile';
import useAuthStore from '../../store/useAuthStore';
import Notice from '../../../screens/Notice/Notice';
import ModifyUserinfo from '../../../screens/InitUserInfo/ModifyUserinfo';
import ModifyStyle from '../../../screens/InitStyle/ModifyStyle';
import InfoOpenChat from '../../../screens/InitUserInfo/units/InfoOpenChat';
import Splash from '../../../screens/Splash/Splash';
import useMemberStore from '../../store/useMemberStore';

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
  { name: 'notice', component: CustomScreen(Notice) },
  { name: 'modifyUserinfo', component: ModifyUserinfo },
  { name: 'modifyStyle', component: CustomScreen(ModifyStyle) },
  { name: 'infoOpenChat', component: InfoOpenChat },
];

export const CustomNavigator = () => {
  const { hasMargin } = useHasMargin();
  const token = useAuthStore((state) => state.token);
  const navigationRef = useRef<NavigationContainerRef<TRootStackParamList>>(null);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);

  useEffect(() => {
    // 토큰이 없을 경우 로그인 페이지로 이동하기 위해 사용
    if (!token && navigationRef.current) {
      navigationRef.current.navigate('login');
    } else {
      saveMemberInfo();
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
        <Stack.Navigator initialRouteName="tapScreen" screenOptions={{ headerShown: false }}>
          {screens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
