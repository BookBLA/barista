import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { useAuthNavigation } from '@commons/hooks/navigations/authNavigation/useAuthNavigation';
import { useInitialRouteName } from '@commons/hooks/navigations/initialRouteName/useInitialRouteName';
import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RejectStudentId from '@screens/Home/screens/StudentId/RejectStudentId';
import StudentId from '@screens/Home/screens/StudentId/StudentId';
import InitBookStack from '@screens/InitBook/initBookStack';
import InitStyleStack from '@screens/InitStyle/initStyle';
import ModifyProfile from '@screens/InitStyle/screens/ModifyProfile/ModifyProfile';
import InitUserInfoStack from '@screens/InitUserInfo/initUserinfo';
import CompletePage from '@screens/InitUserInfo/screens/CompletePage/CompletePage';
import InviteFriends from '@screens/InitUserInfo/screens/InviteFriends/InviteFriends';
import LoginStack from '@screens/Login/LoginStack';
import Notice from '@screens/Notice/Notice';
import QuizStack from '@screens/Quiz/QuizStack';
import SettingStack from '@screens/Setting/SettingStack';
import React from 'react';
import { Platform, SafeAreaView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import TapScreens from '../TapComponent/TapScreens';

const Stack = createNativeStackNavigator();
const screens = [
  { name: 'tapScreens', component: TapScreens },
  { name: 'initUserinfoStack', component: InitUserInfoStack },
  { name: 'completePage', component: CompletePage },
  // { name: 'infoOpenChat', component: InfoOpenChat },
  // { name: 'failedSign', component: FailedSign },
  { name: 'initStyleStack', component: InitStyleStack },
  { name: 'initBookStack', component: InitBookStack },
  { name: 'settingStack', component: SettingStack },
  { name: 'loginStack', component: LoginStack },
  { name: 'notice', component: CustomScreen(Notice) },
  { name: 'quizStack', component: QuizStack },
  // { name: 'waitConfirm', component: WaitConfirm },
  { name: 'inviteFriends', component: InviteFriends },
  { name: 'modifyProfile', component: ModifyProfile },
  { name: 'studentId', component: CustomScreen(StudentId) },
  { name: 'rejectStudentId', component: RejectStudentId },
];

export const CustomNavigator = () => {
  const hasMargin = useAppStatus((state) => state.status.hasMargin);
  const isBackgroundColor = useAppStatus((state) => state.status.isBackgroundColor);
  const navigationRef = useAuthNavigation();
  const getInitialRouteName = useInitialRouteName();
  const insets = useSafeAreaInsets();

  return (
    <NavigationContainer ref={navigationRef}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: isBackgroundColor,
          paddingHorizontal: hasMargin ? 16 : 0,
          paddingTop: Platform.OS === 'android' ? getStatusBarHeight() : insets.top,
          marginBottom: Platform.OS === 'ios' ? insets?.bottom : 0,
        }}
      >
        <Stack.Navigator
          initialRouteName={getInitialRouteName()}
          screenOptions={{ headerShown: false, headerTransparent: true, animation: 'none' }}
        >
          {screens.map(({ name, component }) => (
            <Stack.Screen key={name} name={name} component={component} />
          ))}
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};
