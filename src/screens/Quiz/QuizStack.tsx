import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
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
  useAppUIManager();

  return (
    <Stack.Navigator initialRouteName="stepFirst" screenOptions={{ headerShown: false, animationEnabled: false }}>
      {screens.map(({ name, component }, index) =>
        !index ? (
          <Stack.Screen
            key={name}
            name={name}
            component={CustomScreen(component)}
            initialParams={{ ...route.params }}
          />
        ) : (
          <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
        ),
      )}
    </Stack.Navigator>
  );
};

export default QuizStack;
