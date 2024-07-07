import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { icons } from '../../../../commons/utils/variablesImages';
import { INJECTED_JAVASCRIPT, KAKAO_URL } from '../../LoginStack.constants';
import { useKakaoLogin } from './hooks/useKakakoLogin';
import { useAuthCode } from './hooks/useAuthCode';
import * as S from '../../LoginStack.styles';
import WebView from 'react-native-webview';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import useScreenLogger from '../../../../commons/hooks/useAnalyticsScreenLogger';

const KakaoLogin = () => {
  useScreenLogger();
  useManageMargin();
  const { movePage } = useMovePage();
  const { handleKakaoLogin } = useKakaoLogin();
  const { authCode, getAuthCode } = useAuthCode();

  useEffect(() => {
    if (authCode) {
      handleKakaoLogin(authCode);
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
        startInLoadingState
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event) => {
          getAuthCode(event.nativeEvent['url']);
        }}
      />
    </S.KakaoWrapper>
  );
};

export default KakaoLogin;

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
