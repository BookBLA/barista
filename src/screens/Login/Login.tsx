import React from 'react';
import * as S from './Login.styles';
import { IProps } from './Login.types';
import { Image } from 'react-native';
import KakaoLoginButton from './KakaoLoginButton';
import LoginScreen from './Login.service';
import useMovePage from '../../commons/hooks/useMovePage';
// import {LoginScreen} from "./Login.service"

const Login = () => {
  const { movePage } = useMovePage();
  return (
    <S.Wrapper>
      <S.InnerWrapper>
        <S.LogoImage source={require('../../../assets/images/logos/logoDarkBg.png')} />
        <S.SubTitleText>같은 줄을 읽다. 같은 마음을 느끼다.</S.SubTitleText>
        <S.TitleWrapper>
          <S.TitleText>BOOKBLA</S.TitleText>
        </S.TitleWrapper>
      </S.InnerWrapper>
      <S.InnerWrapper style={{ marginTop: 50 }}>
        <S.SnsText>SNS 간편 로그인</S.SnsText>

        <S.LoginButton onPrssed={movePage('kakao')}>
          <Image source={require('../../../assets/images/buttons/kakaoLogin.png')} />
        </S.LoginButton>
        {/* <S.LoginButton
          onPrssed={alert('성공')}
          source={require('../../../assets/images/buttons/kakaoLogin.png')}
        ></S.LoginButton> */}
        {/* <LoginModal
  uri={uri}
	isOpen={showModal}
	onClose={handleModalClose}
  onMessage={event => getLoginCode(event.nativeEvent.url)}
  loginMethod={loginMethod}
/> */}
        <S.LoginButton source={require('../../../assets/images/buttons/appleLogin.png')}></S.LoginButton>
      </S.InnerWrapper>
    </S.Wrapper>
  );
};

export default Login;
