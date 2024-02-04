import React, { useState } from 'react';
import { Button, TextInput, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loginApi } from '../../commons/api/auth.api';
import * as S from './Login.styles';

const LoginScreen = ({ navigation }: { navigation: any }) => {
  const [email, setEmail] = useState('');

  const handleLogin = async () => {
    const response = await loginApi(email);
    await AsyncStorage.setItem('accessToken', response?.headers?.authorization);
  };

  return (
    <S.SafeAreaViewStyled>
      <S.RowStyled>
        <TouchableOpacity onPress={() => navigation.navigate('home')}>
          <S.ImageStyled source={require('../../../assets/images/example-icon.png')} />
        </TouchableOpacity>
      </S.RowStyled>
      <S.RowStyled>
        <TextInput placeholder="email" onChangeText={setEmail} />
        <Button title="Login" onPress={handleLogin} />
      </S.RowStyled>
    </S.SafeAreaViewStyled>
  );
};

export default LoginScreen;
