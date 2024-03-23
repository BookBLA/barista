import { colors } from '../../../commons/styles/variablesStyles';
import { Image, Text } from 'react-native';
import logo from '../../../../assets/images/logos/logoDark.png';
import * as S from '../InitUserInfo.styles';
import useMovePage from '../../../commons/hooks/useMovePage';

const CompletePage = () => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <Image source={logo} />
      <S.ContentStyled style={{ marginTop: 30, marginBottom: 10 }}>BOOK BLA에 오신 것을 환영합니다!</S.ContentStyled>
      <S.ContentStyled style={{ marginBottom: '70%' }}>프로필 서재를 꾸며볼까요?</S.ContentStyled>
      <S.NextButtonStyled onPress={movePage('initStyleStack')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default CompletePage;
