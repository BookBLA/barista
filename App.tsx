import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClientProvider } from '@tanstack/react-query';
import 'expo-dev-client';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import GlobalErrorModal from './src/commons/components/Feedbacks/GlobalErrorModal/GlobalErrorModal';
import UpdateModal from './src/commons/components/Feedbacks/UpdateModal/UpdateModal';
import { CustomNavigator } from './src/commons/components/Navigations/CustomNavigator/CustomNavigator';
import queryClient from './src/commons/configs/reactQuery/queryClient';
import toastConfig from './src/commons/configs/toast/toastConfig';

// import { INJECTED_JAVASCRIPT } from './src/screens/Login/LoginStack.constants';

import { LoaderProvider } from './src/commons/components/Feedbacks/LoaderProvider/LoaderProvider';
import { useInitializeApp } from './src/commons/hooks/appStatus/useInitializeApp';
import useToast from './src/commons/hooks/utils/toast/useToast';
import { useAppStatus } from './src/commons/store/ui/appStatus/useAppStatus';

export default function App() {
  useInitializeApp();
  useToast();
  const backgroundColor = useAppStatus((state) => state.status.isBackgroundColor);
  const isLight = backgroundColor !== '#fff' ? 'light' : 'dark';

  return (
    <LoaderProvider>
      <QueryClientProvider client={queryClient}>
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
      </QueryClientProvider>
    </LoaderProvider>
  );
}
