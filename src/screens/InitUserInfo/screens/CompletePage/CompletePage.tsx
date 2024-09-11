import logo from '@assets/images/logos/logoDarkNew.png';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { colors } from '@commons/styles/variablesStyles';
import { Image, Text, View } from 'react-native';
import * as S from '../../InitUserInfo.styles';

const CompletePage = () => {
  const { movePage, handleReset } = useMovePage();
  const { resetUserInfo } = useUserStore();

  const nextPage = () => {
    handleReset('initStyleStack');
    resetUserInfo();
  };

  return (
    <S.Wrapper style={{ justifyContent: 'flex-end' }}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
        <Image source={logo} style={{ width: 190, height: 190 }} />
        <CustomText
          size="16px"
          color={colors.textGray}
          font="fontRegular"
          style={{ textAlign: 'center', lineHeight: 28 }}
        >
          BookBLA에 오신 것을 환영합니다! {'\n'} 프로필과 서재를 꾸며볼까요?
        </CustomText>
      </View>
      <S.NextButtonStyled onPress={nextPage} height={44}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default CompletePage;
