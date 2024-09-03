import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import usePushNotifications from '@commons/hooks/notifications/pushNotifications/usePushNotifications';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { buttons, logos } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from '@screens/Login/LoginStack.styles';
import * as AppleAuthentication from 'expo-apple-authentication';
import React from 'react';
import { Image, Platform } from 'react-native';
import { useAppleLogin } from './hooks/useAppleLogin';
import { useTestLogin } from './hooks/useTestLogin';

const LoginHome = () => {
  useScreenLogger();
  useManageMargin();
  usePushNotifications();
  const { movePage } = useMovePage();
  const { handleAppleLogin } = useAppleLogin();
  const { handleTestLogin } = useTestLogin();
  const isDevelop = process.env.NODE_ENV === 'development' ? handleTestLogin : undefined;

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <S.InnerWrapper>
        <S.LogoImage source={logos.mainLogoDark} />
        <S.SubTitleText>같은 줄을 읽다. 같은 마음을 느끼다.</S.SubTitleText>
      </S.InnerWrapper>
      <CustomText size="14px" onPress={isDevelop}>
        SNS 간편 로그인
      </CustomText>

      <S.LoginButton onPress={movePage('kakaoLogin')}>
        <Image style={{ width: 300, height: 45 }} source={buttons.kakaoLogin} />
      </S.LoginButton>
      {Platform.OS === 'ios' && (
        <>
          <AppleAuthentication.AppleAuthenticationButton
            buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
            buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
            cornerRadius={6}
            style={{ width: 300, height: 45, marginBottom: 18 }}
            onPress={handleAppleLogin}
          />
        </>
      )}
    </S.Wrapper>
  );
};

export default LoginHome;
