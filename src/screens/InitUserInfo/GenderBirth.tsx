import React, { useState } from 'react';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from './InitUserInfo.styles';
import { IProps } from '../../commons/components/MbtiItem/MbtiItem.types';
import ProgressBar from '../../commons/components/ProgressBar/ProgressBar';
import DateTimePicker from './DateTimePicker';
import { TouchableOpacity, View, Image } from 'react-native';
import nextButton from '../../../assets/images/icons/next_button.png';

const GenderBirth = ({ navigation }: { navigation: any }) => {
  const [isSelect, setSelect] = useState<null | boolean>(null);

  const handleNext = () => {
    navigation.navigate('namePhone');
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={25} />
      <S.ContentStyled style={{ marginTop: 90, marginBottom: 16 }}>성별을 선택해 주세요.</S.ContentStyled>
      <S.RowStyled>
        <S.BooleanButtonStyled isSelect={isSelect} onPress={() => setSelect(true)}>
          <S.ButtonTextStyled isSelect={isSelect} onPress={() => setSelect(true)}>
            여성
          </S.ButtonTextStyled>
        </S.BooleanButtonStyled>
        <S.BooleanButtonStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
          <S.ButtonTextStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
            남성
          </S.ButtonTextStyled>
        </S.BooleanButtonStyled>
      </S.RowStyled>
      <S.ContentStyled style={{ marginTop: 151, marginBottom: 16 }}>생년월일을 선택해 주세요.</S.ContentStyled>
      {/* <S.DateButtonStyled onPress={() => DateTimePicker}>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>YYYY/MM/DD</Text>
      </S.DateButtonStyled> */}
      <DateTimePicker />
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%', height: '10%' }}>
        <TouchableOpacity onPress={handleNext}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};

export default GenderBirth;
