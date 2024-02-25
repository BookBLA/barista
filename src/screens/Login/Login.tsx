import React from 'react';
import * as S from './Login.styles';
import { IProps } from './Login.types';
import KakaoLoginButton from './KakaoLoginButton';
import LoginScreen from './Login.service';
// import {LoginScreen} from "./Login.service"



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
      <S.InnerWrapper style={{ marginTop: 50 }}>
        <S.SnsText>SNS 간편 로그인</S.SnsText>
        {/* <LoginScreen/> */}
        <KakaoLoginButton/>
        {/* <S.LoginButton onPrssed={LoginScreen} source={require('../../../assets/images/buttons/kakaoLogin.png')}></S.LoginButton> */}
        <S.LoginButton onPrssed={() => handleLogin('Kakao')} source={require('../../../assets/images/buttons/kakaoLogin.png')}></S.LoginButton>
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
