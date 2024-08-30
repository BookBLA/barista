import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import { TProps } from '@screens/Quiz/QuizStack.types';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import StepFirst from '@screens/Quiz/screens/StepFirst';
import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import StepSecond from '@screens/Quiz/screens/StepSecond';
import StepThird from '@screens/Quiz/screens/StepThird';
import Completion from '@screens/Quiz/screens/Completion';

const Stack = createStackNavigator();
const screens = [
  { name: 'stepFirst', component: StepFirst },
  { name: 'stepSecond', component: StepSecond },
  { name: 'stepThird', component: StepThird },
  { name: 'completion', component: Completion },
];

const QuizStack = () => {
  const route = useRoute<TProps>();
  useManageMargin();

  return (
    <Stack.Navigator initialRouteName="stepFirst" screenOptions={{ headerShown: false, animationEnabled: false }}>
      {screens.map(({ name, component }, index) =>
        !index ? (
          <Stack.Screen
            key={name}
            name={name}
            component={CustomScreen(component)}
            initialParams={{ ...route.params.bookQuizInfo }}
          />
        ) : (
          <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
        ),
      )}
    </Stack.Navigator>
  );
};

export default QuizStack;
