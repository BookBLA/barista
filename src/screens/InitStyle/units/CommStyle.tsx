import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { IProps } from '../../../commons/components/MbtiItem/MbtiItem.types';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/icons/prevButton.png';
import nextButton from '../../../../assets/images/icons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';

const CommStyle = () => {
  const [isSelect, setSelect] = useState<null | boolean>(null);
  const [isSelect2, setSelect2] = useState<null | boolean>(null);

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <TitleProgress gauge={66} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>연락 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled isSelect={isSelect} onPress={() => setSelect(true)}>
              <S.ButtonTextStyled isSelect={isSelect} onPress={() => setSelect(true)}>
                느긋이
              </S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
              <S.ButtonTextStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
                칼답
              </S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>데이트 스타일을 알려주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled isSelect={isSelect2} onPress={() => setSelect2(true)}>
              <S.ButtonTextStyled isSelect={isSelect2} onPress={() => setSelect2(true)}>
                집 데이트
              </S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled isSelect={isSelect2 === false} onPress={() => setSelect2(false)}>
              <S.ButtonTextStyled isSelect={isSelect2 === false} onPress={() => setSelect2(false)}>
                야외 데이트
              </S.ButtonTextStyled>
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
