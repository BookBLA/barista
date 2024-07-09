import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { IProps } from '../../../commons/components/MbtiItem/MbtiItem.types';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useStyleStore } from '../../../commons/store/useStyle';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import useManageMargin from '../../../commons/hooks/useManageMargin';

const CommStyle = () => {
  const { updateStyleInfo, styleInfo } = useStyleStore();
  useManageMargin();
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={66} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>연락 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.contactType === '느긋이'}
              onPress={() => updateStyleInfo('contactType', '느긋이')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.contactType === '느긋이'}>느긋이</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.contactType === '칼답'}
              onPress={() => updateStyleInfo('contactType', '칼답')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.contactType === '칼답'}>칼답</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>데이트 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.dateStyleType === '집 데이트'}
              onPress={() => updateStyleInfo('dateStyleType', '집 데이트')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.dateStyleType === '집 데이트'}>집 데이트</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.dateStyleType === '야외 데이트'}
              onPress={() => updateStyleInfo('dateStyleType', '야외 데이트')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.dateStyleType === '야외 데이트'}>야외 데이트</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
      </S.ColumnStyled>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.contactType === '' || styleInfo.dateStyleType === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('dateCost')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default CommStyle;
