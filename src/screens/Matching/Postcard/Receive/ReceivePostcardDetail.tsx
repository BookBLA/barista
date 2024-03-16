import { Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import prevButtonBlack from '../../../../../assets/images/buttons/prevButtonBlack.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import * as S from './ReceivePostcardDetail.styles';

const ReceivePostcardDetail = () => {
  const { movePage } = useMovePage();

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <S.HeaderView>
        <TouchableOpacity onPress={movePage()}>
          <S.HeaderImage source={prevButtonBlack} />
        </TouchableOpacity>
        <S.HeaderTextWrapper>
          <S.HeaderText>받은 엽서</S.HeaderText>
        </S.HeaderTextWrapper>
      </S.HeaderView>
      <View>
        <Text style={{ fontSize: 30 }}> 으갹</Text>
      </View>
      <View>
        <CustomButton contents="거절하기" />
        <CustomButton contents="수락하기" />
      </View>
    </View>
  );
};

export default ReceivePostcardDetail;
