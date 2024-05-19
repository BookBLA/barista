export const REDIRECT_URI = `${process.env.EXPO_PUBLIC_BASE_URL}auth/login/kakao`;
export const KAKAO_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.EXPO_PUBLIC_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
export const INJECTED_JAVASCRIPT = `window.ReactNativeWebView.postMessage('message from webView')`;
