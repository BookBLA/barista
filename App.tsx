import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { initializeKakaoSDK, getKeyHashAndroid } from '@react-native-kakao/core';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Toast from 'react-native-toast-message';
import { FontLoader } from './src/commons/components/Feedbacks/FontLoader/FontLoader';
import GlobalErrorModal from './src/commons/components/Feedbacks/GlobalErrorModal/GlobalErrorModal';
import { CustomNavigator } from './src/commons/components/Navigations/CustomNavigator/CustomNavigator';
import toastConfig from './src/commons/configs/toast/toastConfig';
import mobileAds from 'react-native-google-mobile-ads';

// import * as Core from '@react-native-kakao/core';
// import { INJECTED_JAVASCRIPT } from './src/screens/Login/LoginStack.constants';

import { SafeAreaProvider } from 'react-native-safe-area-context';
import UpdateModal from './src/commons/components/Feedbacks/UpdateModal/UpdateModal';
import useToast from './src/commons/hooks/utils/toast/useToast';
import { useAppStatus } from './src/commons/store/ui/appStatus/useAppStatus';

export default function App() {
  useToast();
  const backgroundColor = useAppStatus((state) => state.status.isBackgroundColor);
  const isLight = backgroundColor !== '#fff' ? 'light' : 'dark';
  initializeKakaoSDK(`${process.env.EXPO_PUBLIC_NATIVE_APP_KEY}`);
  getKeyHashAndroid().then((result) => console.log('keyhash', result));
  // Core.initializeKakaoSDK(`${process.env.EXPO_PUBLIC_NATIVE_APP_KEY}`, {
  //   web: {
  //     javascriptKey: INJECTED_JAVASCRIPT,
  //     restApiKey: `${process.env.EXPO_PUBLIC_REST_API_KEY}`,
  //   },
  // });
  mobileAds()
    .initialize()
    .then((adapterStatuses) => {
      // Initialization complete!
      console.log(adapterStatuses);
    });

  return (
    <FontLoader>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <UpdateModal />
        <BottomSheetModalProvider>
          <SafeAreaProvider style={{ flex: 1 }}>
            <StatusBar style={isLight} translucent />
            <CustomNavigator />
          </SafeAreaProvider>
          <GlobalErrorModal />
        </BottomSheetModalProvider>
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </FontLoader>
  );
}
