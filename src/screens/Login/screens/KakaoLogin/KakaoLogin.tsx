import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { INJECTED_JAVASCRIPT, KAKAO_URL } from '@screens/Login/LoginStack.constants';
import * as S from '@screens/Login/LoginStack.styles';
import React, { useEffect } from 'react';
import { ActivityIndicator, Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import WebView from 'react-native-webview';
import { useAuthCode } from './hooks/useAuthCode';
import { useKakaoLogin } from './hooks/useKakakoLogin';

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
