import { Image, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { IReceivePostcardProps } from './ReceivePostcard.types';
import * as S from './ReceivePostcard.styles';
import postcardImage from '../../../../../assets/images/example-postcard.png';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { colors } from '../../../../commons/styles/variablesStyles';
import { usePostcardCounter } from '../../../../commons/store/usePostcardCounter';
import { useNavigation } from '@react-navigation/native';

export const ReceivePostcard: React.FC<IReceivePostcardProps> = ({ index, postcardId, ...rest }) => {
  const { postcardImageUrl, quizScore, schoolName, userId, age } = rest;
  const [isModalVisible, setModalVisible] = useState(false);
  const postcardCounter = usePostcardCounter((state) => state.count);
  const decrementPostcardCounter = usePostcardCounter((state) => state.decrement);
  const navigation = useNavigation();

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handlePostcardClick = () => {
    if (postcardCounter > 0) {
      console.debug('엽서 차감', postcardCounter);
      //todo 엽서 열람 정보를 넣어줘야할듯
      decrementPostcardCounter();
      // @ts-ignore
      navigation.navigate('receivePostcardDetail', { postcardId });
    } else {
      console.debug('엽서 부족');
      toggleModal();
    }
  };

  const modalConfig = {
    visible: isModalVisible,
    onClose: toggleModal,
    mode: 'round',
    buttons: [
      { label: '아니요', action: toggleModal, color: colors.textBlack, bgColor: colors.buttonMain },
      { label: '충전하러 가기', action: toggleModal, color: colors.textYellow, bgColor: colors.buttonPrimary },
    ],
  };

  return (
    <S.ContainerViewStyled>
      <TouchableOpacity onPress={handlePostcardClick} style={{ height: '100%' }}>
        <Image source={postcardImage} style={S.styles.image} />
        <S.PostcardInfoViewStyled>
          <S.PostcardInfoFirstViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 14 }}>{`${age}살 `}</S.PostcardTextViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 10 }}>
              {`(독서퀴즈: ${quizScore}점)`}{' '}
            </S.PostcardTextViewStyled>
          </S.PostcardInfoFirstViewStyled>
          <S.PostcardTextViewStyled style={{ fontSize: 12 }}>{schoolName}</S.PostcardTextViewStyled>
        </S.PostcardInfoViewStyled>
      </TouchableOpacity>
      <CustomModal modalConfig={modalConfig}>
        <View>
          <Text style={{ fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>엽서가 부족합니다.</Text>
          <Text style={{ marginBottom: 24 }}>엽서가 부족합니다. 충전하러 가시겠어요?</Text>
        </View>
      </CustomModal>
    </S.ContainerViewStyled>
  );
};
