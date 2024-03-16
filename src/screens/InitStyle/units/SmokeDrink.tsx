import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { deviceWidth } from '../../../commons/utils/dimensions';
import { useStyleStore } from '../../../commons/store/useStyle';

const SmokeDrink = () => {
  // const [selectedButton, setSelectedButton] = useState<null | string>(null);
  const { updateStyleInfo, styleInfo } = useStyleStore();
  // const [selectedButtonIndex, setSelectedButtonIndex] = useState<null | number>(null);
  const buttonTitles = ['X', '월 1~2회', '주 1회', '주 2회 이상', '매일'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={32} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>흡연 여부를 알려주세요.</S.ContentStyled>
          <S.RowStyled style={{ width: '95%' }}>
            <T.ButtonStyled
              isSelect={styleInfo.smokeTypes === '흡연'}
              onPress={() => updateStyleInfo('smokeTypes', '흡연')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeTypes === '흡연'}>흡연</S.ButtonTextStyled>
            </T.ButtonStyled>
            <T.ButtonStyled
              isSelect={styleInfo.smokeTypes === '비흡연'}
              onPress={() => updateStyleInfo('smokeTypes', '비흡연')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeTypes === '비흡연'}>비흡연</S.ButtonTextStyled>
            </T.ButtonStyled>
            <T.ButtonStyled
              isSelect={styleInfo.smokeTypes === '가끔'}
              onPress={() => updateStyleInfo('smokeTypes', '가끔')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeTypes === '가끔'}>가끔</S.ButtonTextStyled>
            </T.ButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '100%', alignItems: 'center', height: '30%' }}>
          <S.ContentStyled>음주 여부를 알려주세요.</S.ContentStyled>
          <S.RowStyled style={{ width: '95%', marginBottom: 10 }}>
            {buttonTitles.slice(0, 3).map((title, index) => (
              <T.ButtonStyled
                key={index}
                isSelect={styleInfo.drinkTypes === title}
                onPress={() => updateStyleInfo('drinkTypes', title)}
              >
                <S.ButtonTextStyled isSelect={styleInfo.drinkTypes === title}>{title}</S.ButtonTextStyled>
              </T.ButtonStyled>
            ))}
          </S.RowStyled>
          <S.RowStyled style={{ width: deviceWidth * 0.58 }}>
            {buttonTitles.slice(3).map((title, index) => (
              <T.ButtonStyled
                key={index + 3}
                isSelect={styleInfo.drinkTypes === title + 3}
                onPress={() => updateStyleInfo('drinkTypes', title + 3)}
              >
                <S.ButtonTextStyled isSelect={styleInfo.drinkTypes === title + 3}>{title}</S.ButtonTextStyled>
              </T.ButtonStyled>
            ))}
          </S.RowStyled>
        </View>
      </S.ColumnStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '13%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('oppositeSex')}>
          <Image source={nextButton} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};
export default SmokeDrink;
