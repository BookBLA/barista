import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import Example02 from '../../Example02/Example02';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import nextButton from '../../../../assets/images/icons/next_button.png';
import useMovePage from '../../../commons/hooks/useMovePage';

const Mbti = ({ navigation }: { navigation: any }) => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={16} />
      <S.ContentStyled style={{ marginTop: 30 }}>MBTI를 알려주세요.</S.ContentStyled>
      <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
        4가지 모두 골라주세요.
      </Text>
      <Example02 />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%' }}>
        <TouchableOpacity onPress={movePage('smokeDrink')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default Mbti;
