import { getKeyHashAndroid, initializeKakaoSDK } from '@react-native-kakao/core';
import { useEffect } from 'react';
import mobileAds from 'react-native-google-mobile-ads';

export const useInitializeApp = () => {
  useEffect(() => {
    const initializeApp = async () => {
      try {
        console.debug('App 초기화 시작');

        await initializeKakaoSDK(`${process.env.EXPO_PUBLIC_NATIVE_APP_KEY}`);
        console.debug('Kakao SDK 초기화 성공');

        await mobileAds().initialize();
        console.debug('Google Mobile Ads 초기화 성공');

        const keyHashAndroid = await getKeyHashAndroid();
        console.debug('keyHashAndroid: ', keyHashAndroid);
      } catch (error) {
        console.error('APP 초기화 실패 오류:', error);
      } finally {
        console.debug('App 초기화 완료');
      }
    };

    initializeApp();
  }, []);
};
