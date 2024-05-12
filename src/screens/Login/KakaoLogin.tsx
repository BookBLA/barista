import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import WebView from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { proxyUrl } from '../constant/common';
import axios from 'axios';
import { icons } from '../../commons/utils/variablesImages';
import useMovePage from '../../commons/hooks/useMovePage';
import useManageMargin from '../../commons/hooks/useManageMargin';
import { postLogin } from '../../commons/api/login.api';
import useAuthStore from '../../commons/store/useAuthStore';
import { useInitialRouteName } from '../../commons/hooks/useInitialRouteName';
import useMemberStore from '../../commons/store/useMemberStore';
import useToastStore from '../../commons/store/useToastStore';

const REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}auth/login/kakao`;

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  const showToast = useToastStore((state) => state.showToast);

  const [showOverlay, setShowOverlay] = useState(true);
  const [authCode, setAuthCode] = useState('');

  const setToken = useAuthStore((state) => state.setToken);
  const saveMemberInfo = useMemberStore((state) => state.saveMemberInfo);
  const getInitialRouteName = useInitialRouteName();

  const { movePage } = useMovePage();
  useManageMargin();

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.EXPO_PUBLIC_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleWebViewMessage = (data: any) => {
    KakaoLoginWebView(data);
  };

  function KakaoLoginWebView(data: string) {
    console.log('카카오 로그인 시도:::');
    const exp = 'code=';
    var condition = data.indexOf(exp);
    if (condition !== -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log('authorize_code:::', authorize_code);
      setAuthCode(authorize_code);

      // fetchData();
      // CallPostLogin();
    }
  }
  useEffect(() => {
    if (authCode !== '') {
      console.log('authCode:::', authCode);
      CallPostLogin();
    }
  }, [authCode]);

  const CallPostLogin = async () => {
    try {
      const response = await postLogin(authCode, 'kakao');
      console.log('KAKAO login success', response);
      setToken(response.result.accessToken);
      await saveMemberInfo();
      showToast({
        content: '로그인에 성공하였습니다.',
      });
      movePage(getInitialRouteName())();
    } catch (error) {
      console.log('error', error);
      showToast({
        content: '로그인에 실패하였습니다.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={movePage()} style={{ zIndex: 2 }}>
        <Image source={icons.backArrow} style={{ width: 24, height: 24, marginLeft: 5 }} />
      </TouchableOpacity>
      <WebView
        style={{ flex: 1 }}
        originWhitelist={['*']}
        scalesPageToFit={false}
        source={{
          uri: kakao_url,
        }}
        startInLoadingState={true}
        renderLoading={() => (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={(event: { nativeEvent: { [x: string]: any } }) => {
          handleWebViewMessage(event.nativeEvent['url']);
        }}
      />
    </View>
  );
};

export default Kakao;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 24,
    backgroundColor: '#fff',
    // zIndex: 100,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    // zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
