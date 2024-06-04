import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import Matching from './Matching';
import ReceivePostcardDetail from './Postcard/Receive/ReceivePostcardDetail';
import Product from '../Home/screens/Product/Product';
import Library from '../Library/Library';

const Stack = createStackNavigator();
const screens = [
  { name: 'matching', component: Matching },
  { name: 'receivePostcardDetail', component: ReceivePostcardDetail },
  { name: 'product', component: Product },
  { name: 'library', component: Library },
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
