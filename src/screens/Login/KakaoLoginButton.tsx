import React from 'react';
import { TouchableOpacity, Text, Linking } from 'react-native';

const KakaoLoginButton = () => {
  const BASE_URL = 'https://kauth.kakao.com/oauth/authorize';
  const CLIENT_ID = '68f6f971eae2c6a3dcf201934d369f23'; // Replace with your Kakao Client ID
  const REDIRECT_URI = 'http://localhost:8081/'; // Replace with your redirect URI

  const handlePress = () => {
    const url = `${BASE_URL}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
    Linking.openURL(url);
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text>Log in to Kakao</Text>
    </TouchableOpacity>
  );
};

const styles = {
  button: {
    backgroundColor: '#3E5A99',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default KakaoLoginButton;
