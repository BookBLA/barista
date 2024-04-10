import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { IFontLoaderProps } from './FontLoader.types';

export const FontLoader: React.FC<IFontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        await Font.loadAsync({
          fontBold: require('../../../../assets/fonts/pretendardBold.ttf'),
          fontExtraLight: require('../../../../assets/fonts/pretendardExtraLight.ttf'),
          fontLight: require('../../../../assets/fonts/pretendardLight.ttf'),
          fontMedium: require('../../../../assets/fonts/pretendardMedium.ttf'),
          fontRegular: require('../../../../assets/fonts/pretendardRegular.ttf'),
          fontSemiBold: require('../../../../assets/fonts/pretendardSemiBold.ttf'),
        });

        await SplashScreen.preventAutoHideAsync();
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        console.error('Error loading assets:', error);
      }
    };

    loadFonts().then(() => {
      console.debug('Complete Font Loading');
    });
  }, []);

  if (!fontsLoaded) {
    console.debug('Not Loaded Font');
    return null;
  }

  return children;
};
