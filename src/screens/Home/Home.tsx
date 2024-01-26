import React from 'react';
import { Button } from 'react-native';

import { SafeAreaViewStyled, TitleStyled } from './Home.styles';

const Home = ({ navigation }: { navigation: any }) => {
  const [qqq, setQqq] = useState();

  return (
    <SafeAreaViewStyled>
      <TitleStyled>BookBla</TitleStyled>
      <Button title="example" onPress={() => navigation.navigate('example')} />
    </SafeAreaViewStyled>
  );
};

export default Home;
