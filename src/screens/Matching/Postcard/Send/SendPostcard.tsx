import React, { useState } from 'react';
import { EGender, EPostcardStatus, ISendPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import postcardImage from '../../../../../assets/images/example-book.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { Platform, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';

export const SendPostcard: React.FC<ISendPostcardProps> = ({ ...rest }) => {
  const {
    memberId,
    memberName,
    memberAge,
    memberGender,
    memberSchoolName,
    memberProfileImageUrl,
    memberOpenKakaoRoomUrl,
    representativeBookTitle,
    representativeBookAuthor,
    bookImageUrls,
    postcardStatus,
  } = rest;
  const [isModalVisible, setModalVisible] = useState(false);
  const platformBlurRadius = Platform.select({
    ios: postcardStatus === EPostcardStatus.ACCEPT ? 0 : 9,
    android: postcardStatus === EPostcardStatus.ACCEPT ? 0 : 30,
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
          <S.CircularImage source={postcardImage} blurRadius={platformBlurRadius} />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>{`${memberName} | ${memberAge}`}</S.UserNameText>
              <S.GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>{memberSchoolName}</S.SchoolNameText>
            <S.BookInfoText>{`${representativeBookTitle} · ${representativeBookAuthor.join(', ')}`}</S.BookInfoText>
          </S.UserInfoWrapper>
        </S.UserInfoViewStyled>
        <S.ButtonContainerViewStyled>
          {postcardStatus === EPostcardStatus.PENDING && (
            <>
              <TouchableWithoutFeedback>
                <S.ButtonContainer left backgroundColor="#F5F0E2">
                  <S.ButtonText fontColor={colors.textGray2}>답변 수정</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <S.ButtonContainer right backgroundColor="#EFE7CF">
                  <S.ButtonText fontColor="#6D707C">대기중</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {/*//todo 상태 변경 하기*/}
          {postcardStatus === EPostcardStatus.ACCEPT && (
            <>
              <TouchableWithoutFeedback>
                <S.ButtonContainer left backgroundColor="#ECEDEF">
                  <S.ButtonText fontColor="#D2D6E2">답변 수정</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <S.ButtonContainer right backgroundColor="#BBBFCF">
                  <S.ButtonText fontColor="#ffffff">읽음</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.REFUSED && (
            <>
              <TouchableWithoutFeedback>
                <S.ButtonContainer left backgroundColor="#ECEDEF">
                  <S.ButtonText fontColor="#D2D6E2">답변 수정</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback>
                <S.ButtonContainer right backgroundColor="#8D96B0">
                  <S.ButtonText fontColor="#FFFFFF">거절</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.ACCEPT && (
            <>
              <TouchableWithoutFeedback>
                <S.ButtonContainer left backgroundColor="#ECEDEF">
                  <S.ButtonText fontColor="#D2D6E2">답변 수정</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
              <TouchableWithoutFeedback onPress={toggleModal}>
                <S.ButtonContainer right backgroundColor="#1D2E61">
                  <S.ButtonText fontColor={colors.textYellow}>연락하기</S.ButtonText>
                </S.ButtonContainer>
              </TouchableWithoutFeedback>
            </>
          )}
          {postcardStatus === EPostcardStatus.ALL_WRONG && (
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
        <View>
          <S.ModalUserInfoViewStyled>
            <S.CircularImage source={postcardImage} resizeMode="contain" />
            <S.UserInfoWrapper>
              <S.UserInfoNameWrapper>
                <S.UserNameText style={{ fontSize: 16 }}>{`${memberName} | ${memberAge}`}</S.UserNameText>
                <S.GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
              </S.UserInfoNameWrapper>
              <S.ModalSchoolNameText>{memberSchoolName}</S.ModalSchoolNameText>
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
          <S.ModalBookShelves style={S.styles.Shadow} />
        </View>
      </CustomModal>
    </>
  );
};
