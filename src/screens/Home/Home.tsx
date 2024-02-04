import React from 'react';
import { Button } from 'react-native';

import { SafeAreaViewStyled, TitleStyled } from './Home.styles';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <SafeAreaViewStyled>
      <TitleStyled>BookBla</TitleStyled>
      <Button title="example" onPress={() => navigation.navigate('example')} />
      <Button title="example02" onPress={() => navigation.navigate('example02')} />
      <Button title="auth" onPress={() => navigation.navigate('Login')} />
    </SafeAreaViewStyled>
  );
};

export default Home;
