import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Library from '@screens/Library/Library';
import React from 'react';

const Stack = createStackNavigator();
const screens = [{ name: 'library', component: Library }];

const LibraryStack = () => {
  return (
    <Stack.Navigator initialRouteName="library" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default LibraryStack;
