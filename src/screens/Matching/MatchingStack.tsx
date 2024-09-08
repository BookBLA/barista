import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '@screens/Chat/Chat';
import Product from '@screens/Home/screens/Product/Product';
import Library from '@screens/Library/Library';
import React from 'react';
import Matching from './Matching';
import ReceivePostcardDetail from './Postcard/Receive/ReceivePostcardDetail';

const Stack = createStackNavigator();
const screens = [
  { name: 'matching', component: Matching },
  { name: 'receivePostcardDetail', component: ReceivePostcardDetail },
  { name: 'product', component: Product },
  { name: 'library', component: Library },
  { name: 'chat', component: Chat },
];

const MatchingStack = () => {
  return (
    <Stack.Navigator initialRouteName="matching" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default MatchingStack;
