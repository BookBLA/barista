import { Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { IReceivePostcardProps } from './ReceivePostcard.types';
import * as S from './ReceivePostcard.styles';
import postcardImage from '../../../../../assets/images/example-book.png';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { colors } from '../../../../commons/styles/variablesStyles';
import { usePostcardCounter } from '../../../../commons/store/usePostcardCounter';
import { useNavigation } from '@react-navigation/native';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import useMovePage from '../../../../commons/hooks/useMovePage';

export const ReceivePostcard: React.FC<IReceivePostcardProps> = ({ index, postcardId, ...rest }) => {
  const { postcardImageUrl, quizScore, schoolName, userId, age } = rest;
  const [isModalVisible, setModalVisible] = useState(false);
  const postcardCounter = usePostcardCounter((state) => state.count);
  const decrementPostcardCounter = usePostcardCounter((state) => state.decrement);
  const navigation = useNavigation();
  const { movePage } = useMovePage();

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

  const moveProductScreen = () => {
    toggleModal();
    //@ts-ignore
    navigation.navigate('product');
  };

  const modalConfig = {
    visible: isModalVisible,
    onClose: toggleModal,
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
          <S.PostcardTextViewStyled style={{ fontSize: 12, fontFamily: 'fontLight' }}>
            {schoolName}
          </S.PostcardTextViewStyled>
        </S.PostcardInfoViewStyled>
      </TouchableOpacity>
      <CustomModal modalConfig={modalConfig}>
        <S.EmptyPostcardModalWrapper>
          <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
            엽서가 부족합니다.
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            엽서가 부족합니다. 다음 충전 시간을 확인해 보세요.
          </CustomText>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                아니요
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={moveProductScreen} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                충전시간 확인하기
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>
    </S.ContainerViewStyled>
  );
};
