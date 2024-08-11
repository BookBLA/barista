import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/Layouts/CustomScreen/CustomScreen';
import Library from '../Library/Library';
import ModifyUserinfo from '../InitUserInfo/ModifyUserinfo';
import ModifyStyle from '../InitStyle/ModifyStyle';
import Product from '../Home/screens/Product/Product';

const Stack = createStackNavigator();
const screens = [
  { name: 'library', component: Library },
  { name: 'modifyUserinfo', component: ModifyUserinfo },
  { name: 'modifyStyle', component: ModifyStyle },
  { name: 'product', component: Product },
];

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
