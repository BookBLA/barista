import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import KakaoLogin from './screens/KakaoLogin/KakaoLogin';
import LoginHome from './screens/LoginHome/LoginHome';

const Stack = createStackNavigator();
const screens = [
  { name: 'loginHome', component: LoginHome },
  { name: 'kakaoLogin', component: KakaoLogin },
];

const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="loginHome" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default LoginStack;
