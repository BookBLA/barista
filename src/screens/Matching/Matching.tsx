import { SafeAreaView, View } from 'react-native';
import * as S from '../Example02/Example02.styles';

const Matching = () => {
  return (
    <SafeAreaView>
      <View style={{ marginTop: 100 }}>
        <S.TitleStyled style={{ fontSize: 30 }}>매칭 페이지입니다!</S.TitleStyled>
      </View>
    </SafeAreaView>
  );
};

export default Matching;
