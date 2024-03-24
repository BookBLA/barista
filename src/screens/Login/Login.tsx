import React from 'react';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as S from './Login.styles';
import { Platform, Image } from 'react-native';
import { handleAppleSignIn } from './Login.service';
import useMovePage from '../../commons/hooks/useMovePage';
import { postTestSignUp } from '../../commons/api/example.api';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import useAuthStore from '../../commons/store/useAuthStore';
import { useHasMargin } from '../../commons/store/useHasMargin';
import { saveToken } from '../../commons/utils/tokenStore';
// import {LoginScreen} from "./Login.service"

const Login = () => {
  const { movePage } = useMovePage();
  useHasMargin();
  const setToken = useAuthStore((state) => state.setToken);

  const onClickSignUp = async () => {
    try {
      const response = await postTestSignUp({
        email: 'test',
      });
      await saveToken(response.result.accessToken);
      setToken(response.result.accessToken);
      movePage('tapScreens')();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <S.Wrapper>
      <S.InnerWrapper>
        <S.LogoImage source={require('../../../assets/images/logos/logoDarkBg.png')} />
        <S.SubTitleText>같은 줄을 읽다. 같은 마음을 느끼다.</S.SubTitleText>
        <S.TitleWrapper>
          <S.TitleText>BOOKBLA</S.TitleText>
        </S.TitleWrapper>
      </S.InnerWrapper>
      <CustomText size="14px" onPress={onClickSignUp}>
        SNS 간편 로그인
      </CustomText>

      {Platform.OS === 'ios' ? (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
          cornerRadius={6}
          style={{ width: 300, height: 45 }}
          onPress={handleAppleSignIn}
        />
      ) : (
        <S.LoginButton onPrssed={movePage('kakao')}>
          <Image source={require('../../../assets/images/buttons/kakaoLogin.png')} />
        </S.LoginButton>
      )}
    </S.Wrapper>
  );
};

export default Login;
