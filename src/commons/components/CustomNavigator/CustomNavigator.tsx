import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useHasMargin } from '../../store/useHasMargin';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Platform, SafeAreaView } from 'react-native';
import Example from '../../../screens/Example/Example';
import Example02 from '../../../screens/Example02/Example02';
import { TapScreens } from '../TapComponent/TapScreens';
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
import { CustomScreen } from '../CustomScreen/CustomScreen';

const Stack = createNativeStackNavigator();

const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'initUserinfoStack', component: InitUserInfoStack },
  { name: 'initStyleStack', component: InitStyleStack },
  { name: 'initBookStack', component: InitBookStack },
  { name: 'settingStack', component: SettingStack },
  { name: 'example', component: CustomScreen(Example) },
  { name: 'login', component: CustomScreen(Login) },
  { name: 'kakao', component: CustomScreen(Kakao) },
  { name: 'termsOfService', component: CustomScreen(TermsOfService) },
  { name: 'receivePostcardDetail', component: CustomScreen(ReceivePostcardDetail) },
  { name: 'matching', component: CustomScreen(Matching) },
  { name: 'example02', component: CustomScreen(Example02) },
  { name: 'example03', component: CustomScreen(Example03) },
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
      <Stack.Navigator initialRouteName="termsOfService" screenOptions={{ headerShown: false }}>
        {screens.map(({ name, component }) => (
          <Stack.Screen key={name} name={name} component={component} />
        ))}
      </Stack.Navigator>
    </SafeAreaView>
  );
};
