import nextButton from '@assets/images/buttons/nextButton.png';
import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import React from 'react';
import { Image, View } from 'react-native';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { TitleProgress } from './TitleProgress';

const CommStyle = () => {
  useScreenLogger();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  useAppUIManager();
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={66} />
      <S.ColumnStyled style={{ height: '70%' }}>
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
