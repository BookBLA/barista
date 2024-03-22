import WebView from 'react-native-webview';
import { View } from 'react-native/Libraries/Components/View/View';
import qs from 'qs';
import axios from 'axios';

const REST_API_KEY = '68f6f971eae2c6a3dcf201934d369f23';
const REDIRECT_URI = 'http://localhost:8081/';

const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;

function LoginScreen(){
  const getCode = (target: string) => {
    const exp = 'code=';
    const condition = target.indexOf(exp);
    if (condition !== -1) {
      const requestCode = target.substring(condition + exp.length);
      console.log("requestCode: {}",requestCode)
      //requestToken(requestCode);
    }
  };

  // const requestToken = async (code: string) => {
  //   const requestTokenUrl = 'https://kauth.kakao.com/oauth/token';

  //   const options = qs.stringify({
  //     grant_type: 'authorization_code',
  //     client_id: REST_API_KEY,
  //     redirect_uri: REDIRECT_URI,
  //     code,
  //   });

  //   try {
  //     const tokenResponse = await axios.post(requestTokenUrl, options);
  //     const ACCESS_TOKEN = tokenResponse.data.access_token;

  //     const body = {
  //       ACCESS_TOKEN,
  //     };
  //     const response = await axios.post(REDIRECT_URI, body);
  //     const value = response.data;
  //     console.log(value);
  //     const result = await storeUser(value);
  //     if (result === 'stored') {
  //       const user = await getData('user');
  //       dispatch(read_S(user));
  //       await navigation.navigate('Main');
  //     }
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };

  return (
    <View style={{ flex: 1 }}>
      <WebView
        style={{ flex: 1 }}
        source={{ 
          uri: `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}`,
        }}
        injectedJavaScript={INJECTED_JAVASCRIPT}
        javaScriptEnabled
        onMessage={event => {
          const data = event.nativeEvent.url;
          getCode(data);
        }}
      />
    </View>
  );
}

export default LoginScreen;
