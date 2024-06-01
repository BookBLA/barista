import { TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { IReceivePostcardProps } from './ReceivePostcard.types';
import * as S from './ReceivePostcard.styles';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { colors } from '../../../../commons/styles/variablesStyles';
import { useNavigation } from '@react-navigation/native';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import useToastStore from '../../../../commons/store/useToastStore';
import useFetchMemberPostcard from '../../../../commons/hooks/useMemberPostcard';
import { readPostcard } from '../../../../commons/api/matching.api';

export const ReceivePostcard: React.FC<IReceivePostcardProps> = ({ ...rest }) => {
  const {
    postcardId,
    memberId,
    memberName,
    memberAge,
    memberGender,
    drinkType,
    smokeType,
    contactType,
    dateStyleType,
    dateCostType,
    mbti,
    justFriendType,
    memberSchoolName,
    quizScore,
    bookTitles,
    correctStatuses,
    memberReplyContent,
    postcardImageUrl,
    postcardStatus,
  } = rest;
  const [isNoPostcardModalVisible, setModalVisible] = useState(false);
  const [isCheckBeforeSendPostcardModalVisible, setCheckBeforeSendPostcardModalVisible] = useState(false);
  const { memberPostcard } = useFetchMemberPostcard();
  const navigation = useNavigation();

  const toggleNoPostcardModal = () => {
    setModalVisible(!isNoPostcardModalVisible);
  };

  const toggleCheckBeforeSendPostcardModal = () => {
    setCheckBeforeSendPostcardModalVisible(!isCheckBeforeSendPostcardModalVisible);
  };

  const handlePostcardClick = async () => {
    if (postcardStatus === 'READ') {
      toggleCheckBeforeSendPostcardModal();
      // @ts-ignore
      navigation.navigate('receivePostcardDetail', rest);
    } else {
      if (memberPostcard > 0) {
        console.log(memberPostcard);
        toggleCheckBeforeSendPostcardModal();
      } else {
        toggleNoPostcardModal();
      }
    }
  };

  const showPostcardDetail = async () => {
    try {
      await readPostcard(postcardId);
      console.debug('엽서 차감', memberPostcard);

      toggleCheckBeforeSendPostcardModal();
      // @ts-ignore
      navigation.navigate('receivePostcardDetail', rest);
    } catch {
      useToastStore.getState().showToast({ content: '엽서를 읽을 수 없는 상태입니다.' });
    }
  };

  const moveProductScreen = () => {
    toggleNoPostcardModal();
    //@ts-ignore
    navigation.navigate('product');
  };

  const checkBeforeSendPostcardModalConfig = {
    visible: isCheckBeforeSendPostcardModalVisible,
    onClose: toggleCheckBeforeSendPostcardModal,
  };

  const noPostcardModalConfig = {
    visible: isNoPostcardModalVisible,
    onClose: toggleNoPostcardModal,
  };

  return (
    <S.ContainerViewStyled>
      <TouchableOpacity onPress={handlePostcardClick}>
        <S.BookImage
          source={{
            uri: postcardImageUrl,
          }}
        />

        <S.PostcardInfoViewStyled>
          <S.PostcardInfoFirstViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 14 }}>{`${memberAge}살 `}</S.PostcardTextViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 10 }}>
              {`(독서퀴즈: ${quizScore}점)`}{' '}
            </S.PostcardTextViewStyled>
          </S.PostcardInfoFirstViewStyled>
          <S.PostcardTextViewStyled style={{ fontSize: 12, fontFamily: 'fontLight' }}>
            {memberSchoolName}
          </S.PostcardTextViewStyled>
        </S.PostcardInfoViewStyled>
      </TouchableOpacity>
      <CustomModal modalConfig={checkBeforeSendPostcardModalConfig}>
        <S.EmptyPostcardModalWrapper>
          <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
            받은 엽서 열어보기
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            엽서 1개를 사용해 받은 엽서를 열어보시겠어요?
          </CustomText>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleCheckBeforeSendPostcardModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                아니요
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={showPostcardDetail} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                예
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>
      <CustomModal modalConfig={noPostcardModalConfig}>
        <S.EmptyPostcardModalWrapper>
          <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
            엽서가 부족합니다.
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            엽서가 부족합니다. 다음 충전 시간을 확인해 보세요.
          </CustomText>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleNoPostcardModal} bgColor={colors.buttonMain}>
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
