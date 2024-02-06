import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { CustomNavigator } from './src/commons/components/CustomNavigator/CustomNavigator';

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <CustomNavigator />
      </NavigationContainer>
    </>
  );
}
