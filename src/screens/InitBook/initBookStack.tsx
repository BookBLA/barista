import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import AddBook from './screens/AddBook/AddBook';
import InitQuiz from './screens/InitQuiz/InitQuiz';
import SearchBook from './screens/SearchBook/SearchBook';

const Stack = createStackNavigator();

const screens = [
  { name: 'addBook', component: AddBook },
  { name: 'searchBook', component: SearchBook },
  { name: 'initQuiz', component: InitQuiz },
];

const InitBookStack = () => {
  return (
    <Stack.Navigator initialRouteName="addBook" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default InitBookStack;
