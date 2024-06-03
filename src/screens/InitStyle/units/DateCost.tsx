import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle.styles';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useStyleStore } from '../../../commons/store/useStyle';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import useManageMargin from '../../../commons/hooks/useManageMargin';

const buttonTitles = ['더치페이', '번갈아가면서 사기', '여유 있는 사람이 좀 더', '데이트 통장'];
const DateCost = () => {
  useManageMargin();
  const { updateStyleInfo, styleInfo } = useStyleStore();

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={82} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 38 }}>데이트비용 부담 방식을 알려주세요.</S.ContentStyled>
          {buttonTitles.map((title, index) => (
            <T.LongButtonStyled
              key={index}
              isSelect={styleInfo.dateCostType === title}
              onPress={() => updateStyleInfo('dateCostType', title)}
            >
              <S.ButtonTextStyled isSelect={styleInfo.dateCostType === title}>{title}</S.ButtonTextStyled>
            </T.LongButtonStyled>
          ))}
        </View>
      </S.ColumnStyled>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {styleInfo.dateCostType === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('personalQeustion')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default DateCost;
