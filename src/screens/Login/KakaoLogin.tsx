const BASE_URL = 'https://kauth.kakao.com/oauth/authorize';
const KAKAO_CLIENT_ID = '68f6f971eae2c6a3dcf201934d369f23'; // Replace with your Kakao Client ID
const REDIRECT_URI = 'http://localhost:8081/';

const handleLogin = (loginMethod: string) => {
  /* ********* 카카오 로그인 ******** */
  if (loginMethod === 'kakao') {
    setLoginMethod('kakao');
    setUri(
      `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${KAKAO_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&state=kakao`,
    );
    setShowModal(true);
  }
};
/* 웹 뷰에서 응답 받은 결과를 핸들링 하는 함수 */
// onMessage 함수는 로그인 화면으로 접속할 때와, 로그인 후 결과 화면에서 전부 실행됩니다.
// 우리는 로그인 후의 값이 필요하기 때문에 분기문을 통하여 처리 해줍니다.
const getLoginCode = async (data: string) => {
  if (!data.startsWith(REDIRECT_URI)) return;
const parsedQs = qs.parse(data.split('?')[1]);
  const code = parsedQs?.code as string;
  const state = parsedQs?.state as string;
  // code와 state 값을 가지고 login api params로 세팅.
  if (code && state && ['kakao', 'google', 'apple'].includes(state)) {
    logIn(code, state);
    }
};
};