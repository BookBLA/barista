import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import Toast from 'react-native-toast-message';
import 'expo-dev-client';
import useToast from './src/commons/hooks/utils/toast/useToast';
import { FontLoader } from './src/commons/components/Feedbacks/FontLoader/FontLoader';
import { CustomNavigator } from './src/commons/components/Navigations/CustomNavigator/CustomNavigator';
import GlobalErrorModal from './src/commons/components/Feedbacks/GlobalErrorModal/GlobalErrorModal';
import toastConfig from './src/commons/configs/toast/toastConfig';

export default function App() {
  useToast();

  return (
    <>
      <FontLoader>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StatusBar backgroundColor="white" style="auto" />
            <CustomNavigator />
            <GlobalErrorModal />
          </BottomSheetModalProvider>
          <Toast config={toastConfig} />
        </GestureHandlerRootView>
      </FontLoader>
    </>
  );
}
