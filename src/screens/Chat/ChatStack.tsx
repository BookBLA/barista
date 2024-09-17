// ChatStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Chat from './Chat';
import { ChatStackParamList } from './chat.types';

const Stack = createNativeStackNavigator<ChatStackParamList>();

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default ChatStack;
