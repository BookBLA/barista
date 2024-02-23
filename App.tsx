import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { CustomNavigator } from './src/commons/components/CustomNavigator/CustomNavigator';
import { FontLoader } from './src/commons/components/FontLoader/FontLoader';

export default function App() {
  return (
    <>
      <FontLoader>
        <StatusBar style="auto" />
        <NavigationContainer>
          <CustomNavigator />
        </NavigationContainer>
      </FontLoader>
    </>
  );
}
