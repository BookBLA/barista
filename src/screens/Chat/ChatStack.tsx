// ChatStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Library from '@screens/Library/Library';
import React from 'react';
import Chat from './Chat';
import { ChatStackParamList } from './chat.types';

const Stack = createNativeStackNavigator<ChatStackParamList>();
const screens = [
  { name: 'chat', component: Chat },
  { name: 'library', component: Library },
];

const ChatStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

export default ChatStack;
