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

const CommStyle = () => {
  const { updateStyleInfo, styleInfo } = useStyleStore();

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={66} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>연락 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.contactTypes === '느긋이'}
              onPress={() => updateStyleInfo('contactTypes', '느긋이')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.contactTypes === '느긋이'}>느긋이</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.contactTypes === '칼답'}
              onPress={() => updateStyleInfo('contactTypes', '칼답')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.contactTypes === '칼답'}>칼답</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>데이트 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.dateStyleTypes === '집 데이트'}
              onPress={() => updateStyleInfo('dateStyleTypes', '집 데이트')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.dateStyleTypes === '집 데이트'}>집 데이트</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={styleInfo.dateStyleTypes === '야외 데이트'}
              onPress={() => updateStyleInfo('dateStyleTypes', '야외 데이트')}
            >
              <S.ButtonTextStyled isSelect={styleInfo.dateStyleTypes === '야외 데이트'}>야외 데이트</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '13%' }}>
          <TouchableOpacity onPress={movePage()}>
            <Image source={prevButton} />
          </TouchableOpacity>
          <TouchableOpacity onPress={movePage('dateCost')}>
            <Image source={nextButton} />
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default CommStyle;
