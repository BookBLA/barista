import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import Product from '@screens/Home/screens/Product/Product';
import ModifyStyle from '@screens/InitStyle/screens/ModifyStyle/ModifyStyle';
import Library from '@screens/Library/Library';
import React from 'react';
import AddBook from '@screens/InitBook/screens/AddBook/AddBook';
import SearchBook from '@screens/InitBook/screens/SearchBook/SearchBook';

const Stack = createStackNavigator();
const screens = [
  { name: 'library', component: Library },
  // { name: 'modifyUserinfo', component: ModifyUserinfo },
  { name: 'modifyStyle', component: ModifyStyle },
  { name: 'product', component: Product },
  { name: 'addBook', component: AddBook },
  { name: 'searchBook', component: SearchBook },
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
