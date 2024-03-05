import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/icons/prev_button.png';
import nextButton from '../../../../assets/images/icons/next_button.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';

const DateCost = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const buttonTitles = ['더치페이', '번갈아가며 사기', '여유있는 사람이 좀 더', '데이트 통장'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={82} />
      <S.ContentStyled style={{ marginTop: 120, marginBottom: 26 }}>데이트비용 부담 방식을 알려주세요.</S.ContentStyled>
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
        <TouchableOpacity onPress={movePage('personalQeustion')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default DateCost;
