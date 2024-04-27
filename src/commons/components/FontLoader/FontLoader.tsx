import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import { IFontLoaderProps } from './FontLoader.types';
import useAuthStore from '../../store/useAuthStore';
import useMemberStore from '../../store/useMemberStore';

export const FontLoader: React.FC<IFontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const initializeToken = useAuthStore((state) => state.initializeToken);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);
  const removeToken = useAuthStore((state) => state.removeToken);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        const token = await initializeToken();
        await Font.loadAsync({
          fontBold: require('../../../../assets/fonts/pretendardBold.ttf'),
          fontExtraLight: require('../../../../assets/fonts/pretendardExtraLight.ttf'),
          fontLight: require('../../../../assets/fonts/pretendardLight.ttf'),
          fontMedium: require('../../../../assets/fonts/pretendardMedium.ttf'),
          fontRegular: require('../../../../assets/fonts/pretendardRegular.ttf'),
          fontSemiBold: require('../../../../assets/fonts/pretendardSemiBold.ttf'),
        });
        await SplashScreen.preventAutoHideAsync();
        if (token) {
          await saveMemberInfo();
        }
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
      } catch (error) {
        // NOTE: 성진 - 서버 또는 토큰에 문제가 있을 시 방지하기 위해 사용
        removeToken();
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
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
