import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { IFontLoaderProps } from './FontLoader.types';

export const FontLoader: React.FC<IFontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonts = async () => {
    await Font.loadAsync({
      fontBold: require('../../../../assets/fonts/pretendardBold.ttf'),
      fontExtraLight: require('../../../../assets/fonts/pretendardExtraLight.ttf'),
      fontLight: require('../../../../assets/fonts/pretendardLight.ttf'),
      fontMedium: require('../../../../assets/fonts/pretendardMedium.ttf'),
      fontRegular: require('../../../../assets/fonts/pretendardRegular.ttf'),
      fontSemiBold: require('../../../../assets/fonts/pretendardSemiBold.ttf'),
    });
    setFontsLoaded(true);
  };

  if (!fontsLoaded) {
    return <AppLoading startAsync={loadFonts} onFinish={() => setFontsLoaded(true)} onError={console.warn} />;
  }

  return children;
};
