import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { IProps } from '../../../commons/components/MbtiItem/MbtiItem.types';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../../assets/images/icons/prev_button.png';
import nextButton from '../../../../assets/images/icons/next_button.png';
import useMovePage from '../../../commons/hooks/useMovePage';

const CommStyle = ({ navigation }: { navigation: any }) => {
  const [isSelect, setSelect] = useState<null | boolean>(null);
  const [isSelect2, setSelect2] = useState<null | boolean>(null);

  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={66} />
      <S.ContentStyled style={{ marginTop: 90, marginBottom: 16 }}>연락 스타일을 알려주세요.</S.ContentStyled>
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
      <S.ContentStyled style={{ marginTop: 151, marginBottom: 16 }}>데이트 스타일을 알려주세요.</S.ContentStyled>
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
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} style={{ width: 11 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('dateCost')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};

export default CommStyle;
