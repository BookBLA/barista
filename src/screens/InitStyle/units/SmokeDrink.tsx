import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import prevButton from '../../../../assets/images/icons/prev_button.png';
import nextButton from '../../../../assets/images/icons/next_button.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';

const SmokeDrink = () => {
  const [selectedButton, setSelectedButton] = useState<null | string>(null);
  const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const buttonTitles = ['X', '월 1~2회', '주 1회', '주 2회 이상', '매일'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={32} />
      <S.ContentStyled style={{ marginTop: 110, marginBottom: 26 }}>흡연 여부를 알려주세요.</S.ContentStyled>
      <S.RowStyled>
        <T.ButtonStyled isSelect={selectedButton === '흡연'} onPress={() => setSelectedButton('흡연')}>
          <S.ButtonTextStyled isSelect={selectedButton === '흡연'} onPress={() => setSelectedButton('흡연')}>
            흡연
          </S.ButtonTextStyled>
        </T.ButtonStyled>
        <T.ButtonStyled isSelect={selectedButton === '비흡연'} onPress={() => setSelectedButton('비흡연')}>
          <S.ButtonTextStyled isSelect={selectedButton === '비흡연'} onPress={() => setSelectedButton('비흡연')}>
            비흡연
          </S.ButtonTextStyled>
        </T.ButtonStyled>
        <T.ButtonStyled isSelect={selectedButton === '가끔'} onPress={() => setSelectedButton('가끔')}>
          <S.ButtonTextStyled isSelect={selectedButton === '가끔'} onPress={() => setSelectedButton('가끔')}>
            가끔
          </S.ButtonTextStyled>
        </T.ButtonStyled>
      </S.RowStyled>
      <S.ContentStyled style={{ marginTop: 120, marginBottom: 26 }}>음주 여부를 알려주세요.</S.ContentStyled>
      <S.RowStyled style={{ marginBottom: 10 }}>
        {buttonTitles.slice(0, 3).map((title, index) => (
          <T.ButtonStyled
            key={index}
            isSelect={selectedButtonIndex === index}
            onPress={() => setSelectedButtonIndex(index)}
          >
            <S.ButtonTextStyled isSelect={selectedButtonIndex === index} onPress={() => setSelectedButtonIndex(index)}>
              {title}
            </S.ButtonTextStyled>
          </T.ButtonStyled>
        ))}
      </S.RowStyled>
      <S.RowStyled style={{ width: 250 }}>
        {buttonTitles.slice(3).map((title, index) => (
          <T.ButtonStyled
            key={index + 3}
            isSelect={selectedButtonIndex === index + 3}
            onPress={() => setSelectedButtonIndex(index + 3)}
          >
            <S.ButtonTextStyled
              isSelect={selectedButtonIndex === index + 3}
              onPress={() => setSelectedButtonIndex(index + 3)}
            >
              {title}
            </S.ButtonTextStyled>
          </T.ButtonStyled>
        ))}
      </S.RowStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} style={{ width: 11 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('oppositeSex')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default SmokeDrink;
