import { colors } from '../../commons/styles/variablesStyles';
import { Image, Text } from 'react-native';
import logo from '../../../assets/images/logos/logoDarkBg.png';
import * as S from './InitUserInfo.styles';
const CompletePage = ({ navigation }: { navigation: any }) => {
  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <Image source={logo} />
      <S.ContentStyled style={{ marginTop: 30, marginBottom: 10 }}>BOOK BLA에 오신 것을 환영합니다!</S.ContentStyled>
      <S.ContentStyled style={{ marginBottom: 241 }}>프로필 서재를 꾸며볼까요?</S.ContentStyled>
      <S.NextButtonStyled onPress={() => navigation.navigate('Main')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default CompletePage;
