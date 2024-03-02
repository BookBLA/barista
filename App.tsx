import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { CustomNavigator } from './src/commons/components/CustomNavigator/CustomNavigator';
import { FontLoader } from './src/commons/components/FontLoader/FontLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import GlobalErrorModal from './src/commons/components/GlobalErrorModal/GlobalErrorModal';

export default function App() {
  return (
    <>
      <FontLoader>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <BottomSheetModalProvider>
            <StatusBar style="auto" />
            <NavigationContainer>
              <CustomNavigator />
            </NavigationContainer>
            <GlobalErrorModal />
          </BottomSheetModalProvider>
        </GestureHandlerRootView>
      </FontLoader>
    </>
  );
}
