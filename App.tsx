import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import Example from './src/screens/Example/Example';
import Example02 from './src/screens/Example02/Example02';
import Home from './src/screens/Home/Home';
import LoginScreen from './src/screens/Login/Login';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="home" component={Home} />
          <Stack.Screen name="example" component={Example} />
          <Stack.Screen name="example02" component={Example02} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
