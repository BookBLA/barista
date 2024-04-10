import React, { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { CustomNavigator } from './src/commons/components/CustomNavigator/CustomNavigator';
import { FontLoader } from './src/commons/components/FontLoader/FontLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import GlobalErrorModal from './src/commons/components/GlobalErrorModal/GlobalErrorModal';
import useAuthStore from './src/commons/store/useAuthStore';

export default function App() {
  const initializeToken = useAuthStore((state) => state.initializeToken);

  useEffect(() => {
    initializeToken();
  }, []);

  return (
    <>
      <FontLoader>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StatusBar backgroundColor="white" style="auto" />
            <CustomNavigator />
            <GlobalErrorModal />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </FontLoader>
    </>
  );
}
