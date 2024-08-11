import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as S from '../../LoginStack.styles';
import { Image, Platform } from 'react-native';
import useMovePage from '../../../../commons/hooks/navigations/movePage/useMovePage';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { buttons, logos } from '../../../../commons/utils/ui/variablesImages/variablesImages';
import { useAppleLogin } from './hooks/useAppleLogin';
import useScreenLogger from '../../../../commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useTestLogin } from './hooks/useTestLogin';
import useManageMargin from '../../../../commons/hooks/ui/manageMargin/useManageMargin';
import usePushNotifications from '../../../../commons/hooks/notifications/pushNotifications/usePushNotifications';

const LoginHome = () => {
  useScreenLogger();
  useManageMargin();
  usePushNotifications();
  const { movePage } = useMovePage();
  const { handleAppleLogin } = useAppleLogin();
  // const { handleTestLogin } = useTestLogin();

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <S.InnerWrapper>
        <S.LogoImage source={logos.mainLogoDark} />
        <S.SubTitleText>같은 줄을 읽다. 같은 마음을 느끼다.</S.SubTitleText>
      </S.InnerWrapper>
      <CustomText size="14px">SNS 간편 로그인</CustomText>

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
