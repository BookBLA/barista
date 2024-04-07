import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import AddBook from './units/AddBook';
import SearchBook from './units/SearchBook';
import InitQuiz from './units/InitQuiz';

const Stack = createStackNavigator();

const screens = [
  { name: 'addBook', component: AddBook },
  { name: 'searchBook', component: CustomScreen(SearchBook) },
  { name: 'initQuiz', component: CustomScreen(InitQuiz) },
];

const InitBookStack = ({ route }) => {
  console.log('route1', route);
  return (
    <Stack.Navigator initialRouteName="addBook" screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }) => (
        <Stack.Screen key={name} name={name}>
          {(props) => React.createElement(component, { ...props, route })}
        </Stack.Screen>
      ))}
    </Stack.Navigator>
  );
};

export default InitBookStack;
