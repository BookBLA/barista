import { colors } from '../../../commons/styles/variablesStyles';
import Example02 from '../../Example02/Example02';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useEffect, useState } from 'react';
import { useStyleStore } from '../../../commons/store/useStyle';

const Mbti = () => {
  const { updateStyleInfo, styleInfo } = useStyleStore();
  console.log('styleInfp', styleInfo);

  const { movePage } = useMovePage();
  const [mbti, setMbti] = useState(['E', 'S', 'T', 'J']);

  useEffect(() => {
    console.log('mbti', mbti);
  }, [mbti]);

  const nextPage = () => {
    const mbtiString = mbti.join('');
    updateStyleInfo('mbti', mbtiString);
    console.log('styleInfo', styleInfo);
    movePage('smokeDrink')();
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={16} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14 }}>
            4가지 모두 골라주세요.
          </Text>
        </View>

        <Example02 setMbti={setMbti} />

        <View
          style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%', height: '13%', marginBottom: '5%' }}
        >
          <TouchableOpacity onPress={movePage('smokeDrink')}>
            <Image source={nextButton} />
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};
export default Mbti;
