import { CustomScreen } from '@commons/components/Layouts/CustomScreen/CustomScreen';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { useRoute } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Account from './screens/Account/Account';
import Delete from './screens/Delete/Delete';
import Setting from './screens/Setting/Setting';
import { TProps } from './SettingStack.types';

const Stack = createStackNavigator();
const screens = [
  { name: 'setting', component: Setting },
  { name: 'account', component: Account },
  { name: 'delete', component: Delete },
];

const SettingStack = () => {
  const route = useRoute<TProps>();
  useAppUIManager();

  return (
    <Stack.Navigator initialRouteName="setting" screenOptions={{ headerShown: false, animationEnabled: false }}>
      {screens.map(({ name, component }, index) =>
        !index ? (
          <Stack.Screen
            key={name}
            name={name}
            component={CustomScreen(component)}
            initialParams={{ ...route.params.libraryInfo }}
          />
        ) : (
          <Stack.Screen key={name} name={name} component={CustomScreen(component)} />
        ),
      )}
    </Stack.Navigator>
  );
};

export default SettingStack;
