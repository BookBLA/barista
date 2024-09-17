import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TProps } from '@screens/Quiz/QuizStack.types';
import Completion from '@screens/Quiz/screens/Completion';
import StepFirst from '@screens/Quiz/screens/StepFirst';
import StepSecond from '@screens/Quiz/screens/StepSecond';
import StepThird from '@screens/Quiz/screens/StepThird';
import React from 'react';

const Stack = createStackNavigator();
const screens = [
  { name: 'stepFirst', component: StepFirst },
  { name: 'stepSecond', component: StepSecond },
  { name: 'stepThird', component: StepThird },
  { name: 'completion', component: Completion },
];

const QuizStack = () => {
  const route = useRoute<TProps>();

  return (
    <Stack.Navigator
      initialRouteName="stepFirst"
      screenOptions={{ headerShown: false, animationEnabled: false, headerTransparent: true }}
    >
      {screens.map(({ name, component }) => (
        <Stack.Screen
          key={name}
          name={name}
          component={CustomScreen(component, {
            isGradient: true,
          })}
          initialParams={{ ...route.params }}
        />
      ))}
    </Stack.Navigator>
  );
};

export default QuizStack;
