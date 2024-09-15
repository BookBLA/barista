import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Chat from './Chat';
import ChatDetail from './ChatDetail';
import ChatInfoScreen from './ChatInfoScreen/ChatInfoScreen';
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
      <Stack.Screen name="ChatDetail" component={ChatDetail} />
      <Stack.Screen name="ChatInfoScreen" component={ChatInfoScreen} />
    </Stack.Navigator>
  );
};

export default ChatStack;
