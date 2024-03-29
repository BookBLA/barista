import React, { useState } from 'react';
import { EGender, EPostcardStatus, ISendPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import postcardImage from '../../../../../assets/images/example-postcard.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { Platform, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';

export const SendPostcard: React.FC<ISendPostcardProps> = ({ index, ...rest }) => {
  console.log(rest);
  const { userId, userName, userProfileImageUrl, gender, schoolName, age, postcardStatus, bookName, bookAuthor } = rest;
  const [isModalVisible, setModalVisible] = useState(false);
  const platformBlurRadius = Platform.select({
    ios: postcardStatus === EPostcardStatus.APPROVE ? 0 : 9,
    android: postcardStatus === EPostcardStatus.APPROVE ? 0 : 30,
  });

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const modalConfig = {
    visible: isModalVisible,
    onClose: toggleModal,
    mode: 'round',
    close: true,
    buttons: [
      { label: '오픈채팅방으로 이동', action: toggleModal, color: colors.textYellow, bgColor: colors.buttonPrimary },
    ],
  };

  return (
    <>
      <S.ContainerViewStyled>
        <S.UserInfoViewStyled>
          <S.CircularImage source={postcardImage} resizeMode="contain" blurRadius={platformBlurRadius} />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>{`${userName} | ${age}`}</S.UserNameText>
              <S.GenderIconStyled source={gender === EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>{schoolName}</S.SchoolNameText>
            <S.BookInfoText>{`${bookName} · ${bookAuthor}`}</S.BookInfoText>
          </S.UserInfoWrapper>
        </S.UserInfoViewStyled>
        <S.ButtonContainerViewStyled>
          {postcardStatus === EPostcardStatus.PENDING && (
            <>
              <TouchableWithoutFeedback>
                <S.ButtonContainer left backgroundColor="#F5F0E2">
                  <S.ButtonText fontColor="#999999">답변 수정</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <S.ButtonContainer right backgroundColor="#EFE7CF">
                  <S.ButtonText fontColor="#6D707C">대기중</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.REJECT && (
            <>
              <TouchableWithoutFeedback>
                <S.SingleButtonContainer right backgroundColor="#8D96B0">
                  <S.ButtonText fontColor="#FFFFFF">거절</S.ButtonText>
                </S.SingleButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.APPROVE && (
            <>
              <TouchableWithoutFeedback onPress={toggleModal}>
                <S.SingleButtonContainer right backgroundColor="#1D2E61">
                  <S.ButtonText fontColor={colors.textYellow}>연락하기</S.ButtonText>
                </S.SingleButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.FAIL && (
            <>
              <TouchableWithoutFeedback>
                <S.SingleButtonContainer right backgroundColor="#616C90" flex={1}>
                  <S.ButtonText fontColor="#FFFFFF">독서퀴즈를 모두 틀렸습니다. 책을 다시 읽어봐요!</S.ButtonText>
                </S.SingleButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
        </S.ButtonContainerViewStyled>
      </S.ContainerViewStyled>
      <S.dashLineViewStyled />
      <CustomModal modalConfig={modalConfig}>
        <S.ModalUserInfoViewStyled>
          <S.CircularImage source={postcardImage} resizeMode="contain" />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText style={{ fontSize: 16 }}>{`${userName} | ${age}`}</S.UserNameText>
              <S.GenderIconStyled source={gender === EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.ModalSchoolNameText>{schoolName}</S.ModalSchoolNameText>
          </S.UserInfoWrapper>
        </S.ModalUserInfoViewStyled>
        <S.ModalBookListContainer>
          <S.ModalBookWrapper>
            <S.ModalBookImage source={require('../../../../../assets/images/example-book.png')} />
          </S.ModalBookWrapper>
          <S.ModalBookWrapper>
            <S.ModalBookImage source={require('../../../../../assets/images/example-book.png')} />
          </S.ModalBookWrapper>
          <S.ModalBookWrapper>
            <S.ModalBookImage source={require('../../../../../assets/images/example-book.png')} />
          </S.ModalBookWrapper>
        </S.ModalBookListContainer>
        <S.ModalBookShelves />
      </CustomModal>
    </>
  );
};
