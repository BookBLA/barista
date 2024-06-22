import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { CustomScreen } from '../../commons/components/CustomScreen/CustomScreen';
import Setting from './screens/Setting/Setting';
import Account from './screens/Account/Account';
import Delete from './screens/Delete/Delete';
import { TProps } from './SettingStack.types';
import useManageMargin from '../../commons/hooks/useManageMargin';
import { useRoute } from '@react-navigation/native';

const Stack = createStackNavigator();
const screens = [
  { name: 'setting', component: Setting },
  { name: 'account', component: Account },
  { name: 'delete', component: Delete },
];

const SettingStack = () => {
  const route = useRoute<TProps>();
  useManageMargin();

  return (
    <Stack.Navigator initialRouteName="setting" screenOptions={{ headerShown: false }}>
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
