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
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import useManageMargin from '../../../commons/hooks/useManageMargin';

const SmokeDrink = () => {
  useManageMargin();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const buttonTitles = ['X', '월 1~2회', '주 1회', '주 2회 이상', '매일'];

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={32} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '95%', alignItems: 'center' }}>
          <S.ContentStyled>흡연 여부를 알려주세요.</S.ContentStyled>
          <S.RowStyled style={{ width: '95%' }}>
            <T.ButtonStyled
              isSelect={styleInfo.smokeType === '흡연'}
              onPress={() => updateStyleInfo('smokeType', '흡연')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeType === '흡연'}>흡연</S.ButtonTextStyled>
            </T.ButtonStyled>
            <T.ButtonStyled
              isSelect={styleInfo.smokeType === '비흡연'}
              onPress={() => updateStyleInfo('smokeType', '비흡연')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeType === '비흡연'}>비흡연</S.ButtonTextStyled>
            </T.ButtonStyled>
            <T.ButtonStyled
              isSelect={styleInfo.smokeType === '가끔'}
              onPress={() => updateStyleInfo('smokeType', '가끔')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.smokeType === '가끔'}>가끔</S.ButtonTextStyled>
            </T.ButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '95%', alignItems: 'center', height: '30%' }}>
          <S.ContentStyled>음주 여부를 알려주세요.</S.ContentStyled>
          <S.RowStyled style={{ width: '95%', marginBottom: 10 }}>
            {buttonTitles.slice(0, 3).map((title, index) => (
              <T.ButtonStyled
                key={index}
                isSelect={styleInfo.drinkType === title}
                onPress={() => updateStyleInfo('drinkType', title)}
              >
                <S.ButtonTextStyled isSelect={styleInfo.drinkType === title}>{title}</S.ButtonTextStyled>
              </T.ButtonStyled>
            ))}
          </S.RowStyled>
          <S.RowStyled style={{ width: deviceWidth * 0.58 }}>
            {buttonTitles.slice(3).map((title, index) => (
              <T.ButtonStyled
                key={index + 3}
                isSelect={styleInfo.drinkType === title}
                onPress={() => updateStyleInfo('drinkType', title)}
              >
                <S.ButtonTextStyled isSelect={styleInfo.drinkType === title}>{title}</S.ButtonTextStyled>
              </T.ButtonStyled>
            ))}
          </S.RowStyled>
        </View>
      </S.ColumnStyled>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.smokeType === '' || styleInfo.drinkType === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('oppositeSex')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default SmokeDrink;
