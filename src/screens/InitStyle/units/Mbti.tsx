import { colors } from '../../../commons/styles/variablesStyles';
import Example02 from '../../Example02/Example02';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import nextButton from '../../../../assets/images/icons/next_button.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';

const Mbti = () => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={16} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
            4가지 모두 골라주세요.
          </Text>
        </View>

        <Example02 />

        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%', height: '15%' }}>
          <TouchableOpacity onPress={movePage('smokeDrink')}>
            <Image source={nextButton} />
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};
export default Mbti;
