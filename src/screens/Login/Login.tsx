import React from 'react';
import * as S from './Login.styles';
import { IProps } from './Login.types';
import * as AppleAuthentication from 'expo-apple-authentication';
import { Platform } from 'react-native';
import { handleAppleSignIn } from './Login.service';

const Login: React.FC<IProps> = ({ navigation }) => {
  return (
    <S.Wrapper>
      <S.InnerWrapper>
        <S.LogoImage source={require('../../../assets/images/logos/logoDarkBg.png')} />
        <S.SubTitleText>같은 줄을 읽다. 같은 마음을 느끼다.</S.SubTitleText>
        <S.TitleWrapper>
          <S.TitleText>BOOK BLA</S.TitleText>
        </S.TitleWrapper>
      </S.InnerWrapper>
      <S.SnsText>SNS 간편 로그인</S.SnsText>

      {Platform.OS === 'ios' ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={6}
          style={{ width: 300, height: 45 }}
          onPress={handleAppleSignIn}
        />
      ) : (
        <S.LoginButton source={require('../../../assets/images/buttons/kakaoLogin.png')} />
      )}
    </S.Wrapper>
  );
};

export default Login;
