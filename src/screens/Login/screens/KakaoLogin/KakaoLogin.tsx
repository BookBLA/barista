import React, { useEffect } from 'react';
import { TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import { icons } from '../../../../commons/utils/variablesImages';
import { INJECTED_JAVASCRIPT, KAKAO_URL } from '../../LoginStack.constants';
import { useKakaoLogin } from './hooks/useKakakoLogin';
import { useAuthCode } from './hooks/useAuthCode';
import * as S from '../../LoginStack.styles';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useManageMargin from '../../../../commons/hooks/useManageMargin';

const KakaoLogin = () => {
  useManageMargin();
  const { movePage } = useMovePage();
  const { callPostLogin } = useKakaoLogin();
  const { authCode, getAuthCode } = useAuthCode();

  useEffect(() => {
    if (authCode) {
      callPostLogin(authCode);
    }
  }, [authCode]);

  return (
    <S.KakaoWrapper>
      <TouchableOpacity onPress={movePage()} style={{ zIndex: 2 }}>
        <Image source={icons.backArrow} style={{ width: 24, height: 24, marginLeft: 5 }} />
      </TouchableOpacity>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: KAKAO_URL,
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <S.LoadingWrapper>
            <ActivityIndicator size="large" color="#000" />
          </S.LoadingWrapper>
        )}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event: WebViewMessageEvent) => {
          getAuthCode(event.nativeEvent['url']);
        }}
      />
    </S.KakaoWrapper>
  );
};

export default KakaoLogin;
