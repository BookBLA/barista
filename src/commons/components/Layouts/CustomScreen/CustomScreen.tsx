import { useAppStatus } from '@commons/store/ui/appStatus/useAppStatus';
import { colors } from '@commons/styles/variablesStyles';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';
import { MainView } from './CustomScreen.styles';

const gradientColors = ['#455C9F', '#1D2E61'];

export const CustomScreen = (Component: React.ComponentType<any>): React.FC => {
  const WrappedComponent: React.FC = (props) => {
    const backgroundColor = useAppStatus((state) => state.status.isBackgroundColor);

    return (
      <MainView>
        {backgroundColor === colors.primary ? (
          <LinearGradient colors={gradientColors} style={{ flex: 1 }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
            <Component {...props} />
          </LinearGradient>
        ) : (
          <View style={{ flex: 1 }}>
            <Component {...props} />
          </View>
        )}
      </MainView>
    );
  };

  return WrappedComponent;
};
