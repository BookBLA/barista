import logo from '@assets/images/logos/logoDark.png';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { colors } from '@commons/styles/variablesStyles';
import { Image, Text, View } from 'react-native';
import * as S from '../InitUserInfo.styles';

const CompletePage = () => {
  const { movePage } = useMovePage();
  const { resetUserInfo } = useUserStore();

  const nextPage = () => {
    movePage('initStyleStack')();
    resetUserInfo();
  };

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} />
        <S.ContentStyled style={{ marginTop: 30, marginBottom: 10 }}>BOOK BLA에 오신 것을 환영합니다!</S.ContentStyled>
        <S.ContentStyled>프로필 서재를 꾸며볼까요?</S.ContentStyled>
      </View>
      <S.NextButtonStyled onPress={nextPage}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default CompletePage;
