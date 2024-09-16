import { getMemberStatusesApi } from '@commons/api/members/default/member.api';
import { checkReinstallation } from '@commons/store/appStatus/installStatus/installStatusStore';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { IFontLoaderProps } from './FontLoader.types';

export const FontLoader: React.FC<IFontLoaderProps> = ({ children }) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const initializeToken = useAuthStore((state) => state.initializeToken);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);
  const removeToken = useAuthStore((state) => state.removeToken);
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);

  useEffect(() => {
    const loadFonts = async () => {
      try {
        let token = '';
        const isNewInstallation = await checkReinstallation();

        // TODO: 필요 시 if문 조건에 아이폰일 경우에만 넣기
        if (isNewInstallation) {
          await removeToken();
        } else {
          token = (await initializeToken()) ?? '';
        }

        await Font.loadAsync({
          fontExtraBold: require('../../../../../assets/fonts/pretendardExtraBold.ttf'),
          fontBold: require('../../../../../assets/fonts/pretendardBold.ttf'),
          fontExtraLight: require('../../../../../assets/fonts/pretendardExtraLight.ttf'),
          fontLight: require('../../../../../assets/fonts/pretendardLight.ttf'),
          fontMedium: require('../../../../../assets/fonts/pretendardMedium.ttf'),
          fontRegular: require('../../../../../assets/fonts/pretendardRegular.ttf'),
          fontSemiBold: require('../../../../../assets/fonts/pretendardSemiBold.ttf'),
        });
        await SplashScreen.preventAutoHideAsync();
        if (token) {
          const memberStatus = await saveMemberInfo();
          if (memberStatus === 'STYLE') {
            //토큰이 있을 때>memberStatus가 STYLE일 때>schoolStatus를 가져온다>updateMemberInfo로 schoolStatus를 업데이트한다
            const response = await getMemberStatusesApi();
            updateMemberInfo('schoolStatus', response.result?.schoolStatus ?? 'OPEN');
          }
        }
      } catch (error) {
        removeToken();
        console.error('Error loading assets:', error);
      } finally {
        setFontsLoaded(true);
        await SplashScreen.hideAsync();
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
