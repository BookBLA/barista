import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/icons/prev_button.png';
import nextButton from '../../../../assets/images/icons/next_button.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';

const OppositeSex = ({ navigation }: { navigation: any }) => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const buttonTitles = ['허용 X', '단 둘이 밥먹기', '단 둘이 술마시기', '단 둘이 여행가기', '상관없음'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={50} />
      <S.ContentStyled style={{ marginTop: 120, marginBottom: 26 }}>이성친구 허용범위를 알려주세요.</S.ContentStyled>
      {buttonTitles.map((title, index) => (
        <T.LongButtonStyled
          key={index}
          isSelect={selectedButtonIndex === index}
          onPress={() => setSelectedButtonIndex(index)}
        >
          <S.ButtonTextStyled isSelect={selectedButtonIndex === index} onPress={() => setSelectedButtonIndex(index)}>
            {title}
          </S.ButtonTextStyled>
        </T.LongButtonStyled>
      ))}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} style={{ width: 11 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('commStyle')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default OppositeSex;
