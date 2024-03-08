import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';

const OppositeSex = () => {
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const buttonTitles = ['허용 X', '단 둘이 밥먹기', '단 둘이 술마시기', '단 둘이 여행가기', '상관없음'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 38 }}>이성친구 허용범위를 알려주세요.</S.ContentStyled>
          {buttonTitles.map((title, index) => (
            <T.LongButtonStyled
              key={index}
              isSelect={selectedButtonIndex === index}
              onPress={() => setSelectedButtonIndex(index)}
            >
              <S.ButtonTextStyled
                isSelect={selectedButtonIndex === index}
                onPress={() => setSelectedButtonIndex(index)}
              >
                {title}
              </S.ButtonTextStyled>
            </T.LongButtonStyled>
          ))}
        </View>
      </S.ColumnStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '13%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('commStyle')}>
          <Image source={nextButton} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default OppositeSex;
