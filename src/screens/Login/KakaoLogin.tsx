import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import WebView from 'react-native-webview';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
// import { proxyUrl } from '../constant/common';
import axios from 'axios';
import { icons } from '../../commons/utils/variablesImages';
import useMovePage from '../../commons/hooks/useMovePage';

const REST_API_KEY = '68f6f971eae2c6a3dcf201934d369f23';
// const REDIRECT_URI = 'custom-scheme://TermsOfService';
const REDIRECT_URI = 'http://localhost:8080/api';
const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

const Kakao = () => {
  const [showOverlay, setShowOverlay] = useState(true);

  const navigation = useNavigation();

  const kakao_url = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleWebViewMessage = (data: any) => {
    KakaoLoginWebView(data);
  };

  function KakaoLoginWebView(data: string) {
    console.log('카카오 로그인 시도:::');
    const exp = 'code=';
    var condition = data.indexOf(exp);
    if (condition != -1) {
      var authorize_code = data.substring(condition + exp.length);
      console.log('코드:::', authorize_code);
      // fetchData();
    }
  }
  const { movePage } = useMovePage();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={movePage()}>
        <Image source={icons.backArrow} style={{ width: 24, height: 24 }} />
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
    zIndex: 100,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: '#fff',
    zIndex: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
