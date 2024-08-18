import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { CustomNavigator } from './src/commons/components/CustomNavigator/CustomNavigator';
import { FontLoader } from './src/commons/components/FontLoader/FontLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import GlobalErrorModal from './src/commons/components/GlobalErrorModal/GlobalErrorModal';
import Toast from 'react-native-toast-message';
import useToast from './src/commons/hooks/useToast';
import toastConfig from './src/commons/configs/toastConfig';
import 'expo-dev-client';
import 'react-native-purchases';

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
