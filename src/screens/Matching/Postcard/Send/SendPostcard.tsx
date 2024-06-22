import React, { useState } from 'react';
import { EGender, EPostcardStatus, ISendPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { Linking, Platform, Image, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import useToastStore from '../../../../commons/store/useToastStore';
import { img } from '../../../../commons/utils/variablesImages';
import { useToggle } from '../../../../commons/hooks/useToggle';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { useLimitTextLine } from '../../../../commons/hooks/useLimitTextLine';
import { ModalWrapper } from '../../../Setting/SettingStack.styles';
import pencilIcon from '../../../../../assets/images/icons/Pencil.png';

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
  const { toggle, isOpen } = useToggle();
  const showToast = useToastStore((state) => state.showToast);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const handleOpenKakaoRoomUrl = async () => {
    const supported = await Linking.canOpenURL(memberOpenKakaoRoomUrl);

    if (supported) {
      await Linking.openURL(memberOpenKakaoRoomUrl);
    } else {
      useToastStore.getState().showToast({ content: '올바르지 않은 링크입니다! 관리자에게 문의해주세요!' });
    }
  };

  const modalConfig = {
    visible: isModalVisible,
    onClose: toggleModal,
    mode: 'round',
    close: true,
    buttons: [
      {
        label: '오픈채팅방으로 이동',
        action: handleOpenKakaoRoomUrl,
        color: colors.textYellow,
        bgColor: colors.buttonPrimary,
      },
    ],
  };

  const { handleLimitTextLine } = useLimitTextLine();
  const [answer, setAnswer] = useState('원래답변');

  const handleTextChange = (text: string) => {
    if (text.length !== 0) {
      //question이 비어있지 않다면
      handleLimitTextLine(text, setAnswer, 4);

      // updateStyleInfo('memberAsk', question);
    } else {
      setAnswer(text);
    }
  };

  const modifyPersonalQuiz = () => {
    //개인 질문 답변 수정 api 호출
    showToast({ content: '답변이 수정되었습니다!' });
    toggle();
  };

  return (
    <>
      <S.ContainerViewStyled>
        <S.UserInfoViewStyled>
          <S.CircularImage
            source={{ uri: memberProfileImageUrl }}
            blurRadius={postcardStatus === EPostcardStatus.ACCEPT ? undefined : platformBlurRadius}
          />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>{`${memberName} | ${memberAge}`}</S.UserNameText>
              <S.GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>{memberSchoolName}</S.SchoolNameText>
            <S.BookInfoText>{`${representativeBookTitle} · ${representativeBookAuthor?.join(', ')}`}</S.BookInfoText>
          </S.UserInfoWrapper>
        </S.UserInfoViewStyled>
        <S.ButtonContainerViewStyled>
          {postcardStatus === EPostcardStatus.PENDING && (
            <>
              <TouchableWithoutFeedback onPress={toggle}>
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
          {postcardStatus === EPostcardStatus.READ && (
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
            <S.CircularImage source={{ uri: memberProfileImageUrl }} resizeMode="cover" />
            <S.UserInfoWrapper>
              <S.UserInfoNameWrapper>
                <S.UserNameText style={{ fontSize: 16 }}>{`${memberName} | ${memberAge}`}</S.UserNameText>
                <S.GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
              </S.UserInfoNameWrapper>
              <S.ModalSchoolNameText>{memberSchoolName}</S.ModalSchoolNameText>
            </S.UserInfoWrapper>
          </S.ModalUserInfoViewStyled>
          <S.ModalBookListContainer>
            {bookImageUrls?.map((bookImageUrl) => (
              <S.ModalBookWrapper>
                <S.ModalBookImage source={bookImageUrl ? { uri: bookImageUrl } : img.prepareBookImage} />
              </S.ModalBookWrapper>
            ))}
          </S.ModalBookListContainer>
          <S.ModalBookShelves style={S.styles.Shadow} />
        </View>
      </CustomModal>
      <CustomModal
        modalConfig={{
          visible: isOpen,
          onClose: toggle,
          mode: 'round',
          close: true,
          contents: (
            <ModalWrapper>
              <CustomText style={{ marginBottom: 15 }}>수정할 내용을 입력해주세요.</CustomText>
              <S.ModifyAnswerTextInput
                defaultValue={'원래 답변'}
                value={answer}
                onChangeText={(text: string) => handleTextChange(text)}
              />
              <Image
                source={pencilIcon}
                style={{ width: 14, height: 14, position: 'absolute', right: '10%', top: '45%' }}
              />
            </ModalWrapper>
          ),
          buttons: [{ label: '수정 완료', action: modifyPersonalQuiz }],
        }}
      />
    </>
  );
};
