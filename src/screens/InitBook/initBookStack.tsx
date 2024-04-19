import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import AddBook from './screens/AddBook/AddBook';
import SearchBook from './screens/SearchBook/SearchBook';
import InitQuiz from './screens/InitQuiz/InitQuiz';

const Stack = createStackNavigator();

const screens = [
  { name: 'addBook', component: AddBook },
  { name: 'searchBook', component: SearchBook },
  { name: 'initQuiz', component: InitQuiz },
];

const InitBookStack = ({ route }: { route: unknown }) => {
  return (
    <Stack.Navigator initialRouteName="addBook" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
      ))}
    </Stack.Navigator>
  );
};

export default InitBookStack;
