/* 로그인 모달 JSX */
import React from 'react';
import { Box, HStack, Image, Modal, View } from 'native-base';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import { Dimensions, TouchableOpacity } from 'react-native';
interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMessage: (e: WebViewMessageEvent) => void;
  uri: string;
  loginMethod: string;
}
const SCRAPE_URL = '(function() {{window.ReactNativeWebView.postMessage((`document.URL`));}})();';
const LoginModal = ({ isOpen, onClose, onMessage, uri, loginMethod }: LoginModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} h={Dimensions.get('screen').height}>
      <Modal.Content maxWidth="100%" w="100%" h="100%" position="absolute" bottom="0px" bgColor="#fff">
        <HStack justifyContent="space-between">
          <Box w="24px" />
          <TouchableOpacity onPress={onClose}>
            <Image source={require('assets/images/etc/x-icon-black.png')} w="24px" h="24px" m="16px" alt="x-icon" />
          </TouchableOpacity>
        </HStack>
        <View flex={1}>
          {uri.length > 0 && (
            <WebView
              // 소셜 로그인 주소(handleLogin 함수에서 세팅해준 uri) 실행
              source={{
                uri: uri,
              }}
              javaScriptEnabled={true}
              scalesPageToFit={true}
              originWhitelist={['*']}
              /* ********************************************** */
              // 해당 props를 아래의 방식으로 주면,
              // 소셜 로그인 시 자동 로그인이 되지 않음.
              cacheMode={'LOAD_NO_CACHE'}
              cacheEnabled={false}
              incognito={true}
              /* ********************************************** */
              // 웹 뷰가 열릴 때 실행 될 script
              // postMessage로 데이터를 보냅니다.
              injectedJavaScript={SCRAPE_URL}
              // 웹뷰에서 보내는 데이터를 받습니다.
              onMessage={(e: WebViewMessageEvent) => onMessage(e)}
              // google 로그인 일 경우, 디바이스에서 웹 뷰 방식으로 로그인 하는 것을 막았기 때문에,
              // 로그인 방식이 google 일 경우에만 userAgent를 설정해줍니다.
              // expo GoogleSignIn 라이브러리를 통하여 userAgent 조작 없이 로그인 가능.
              userAgent={
                loginMethod === 'google'
                  ? 'Mozilla/5.0 (iPhone; CPU iPhone OS 15_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.0 Mobile/15E148 Safari/604.1'
                  : undefined
              }
            />
          )}
        </View>
      </Modal.Content>
    </Modal>
  );
};
export default LoginModal;
