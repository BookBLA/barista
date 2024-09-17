import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { View } from 'react-native';
import { MainView } from './CustomScreen.styles';

interface CustomScreenOptions {
  isGradient?: boolean;
  gradientColors?: string[];
}

export const CustomScreen = (Component: React.ComponentType<any>, options?: CustomScreenOptions) => {
  const { isGradient = false, gradientColors = ['#455C9F', '#1D2E61'] } = options || {};

  return (props: object) => (
    <MainView>
      {isGradient ? (
        <LinearGradient colors={gradientColors} style={{ flex: 1 }} start={{ x: 0, y: 1 }} end={{ x: 0, y: 0 }}>
          <Component {...props} />
        </LinearGradient>
      ) : (
        <View style={[{ flex: 1 }]}>
          <Component {...props} />
        </View>
      )}
    </MainView>
  );
};
