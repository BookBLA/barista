import { Linking, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import { IReceivePostcardProps } from './ReceivePostcard.types';
import * as S from './ReceivePostcard.styles';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import useToastStore from '../../../../commons/store/useToastStore';
import useFetchMemberPostcard from '../../../../commons/hooks/useMemberPostcard';
import { readPostcard } from '../../../../commons/api/matching.api';
import { EGender, EPostcardStatus } from '../Send/SendPostcard.types';
import useMovePage from '../../../../commons/hooks/useMovePage';
import {
  CircularImage,
  GenderIconStyled,
  ModalBookImage,
  ModalBookListContainer,
  ModalBookShelves,
  ModalBookWrapper,
  ModalSchoolNameText,
  ModalUserInfoViewStyled,
  styles,
  UserInfoNameWrapper,
  UserInfoWrapper,
  UserNameText,
} from '../Send/SendPostcard.styles';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import useModalStore from '../../../../commons/store/useModalStore';
import { img } from '../../../../commons/utils/variablesImages';

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
    memberProfileImageUrl,
    memberOpenKakaoRoomUrl,
    bookImageUrls,
    postcardImageUrl,
    postcardStatus,
  } = rest;
  const [isNoPostcardModalVisible, setModalVisible] = useState(false);
  const [isCheckBeforeSendPostcardModalVisible, setCheckBeforeSendPostcardModalVisible] = useState(false);
  const { memberPostcard } = useFetchMemberPostcard();
  const { movePageNoReference } = useMovePage();
  const { isMatchingApproveModalVisible, setMatchingApproveModalVisible } = useModalStore();

  console.log(bookImageUrls);
  const toggleNoPostcardModal = () => {
    setModalVisible(!isNoPostcardModalVisible);
  };

  const toggleCheckBeforeSendPostcardModal = () => {
    setCheckBeforeSendPostcardModalVisible(!isCheckBeforeSendPostcardModalVisible);
  };

  const handlePostcardClick = async () => {
    if ([EPostcardStatus.READ, EPostcardStatus.ACCEPT].includes(postcardStatus)) {
      movePageNoReference('receivePostcardDetail', rest);
    } else {
      if (memberPostcard > 0) {
        toggleCheckBeforeSendPostcardModal();
      } else {
        toggleNoPostcardModal();
      }
    }
  };

  const showPostcardDetail = async () => {
    try {
      await readPostcard(postcardId);
      toggleCheckBeforeSendPostcardModal();

      movePageNoReference('receivePostcardDetail', rest);
    } catch {
      useToastStore.getState().showToast({ content: '엽서를 읽을 수 없는 상태입니다.' });
    }
  };

  const moveProductScreen = () => {
    toggleNoPostcardModal();
    movePageNoReference('receivePostcardDetail', rest);
  };

  const checkBeforeSendPostcardModalConfig = {
    visible: isCheckBeforeSendPostcardModalVisible,
    onClose: toggleCheckBeforeSendPostcardModal,
  };

  const noPostcardModalConfig = {
    visible: isNoPostcardModalVisible,
    onClose: toggleNoPostcardModal,
  };

  const handleOpenKakaoRoomUrl = async () => {
    const supported = await Linking.canOpenURL(memberOpenKakaoRoomUrl);

    if (supported) {
      await Linking.openURL(memberOpenKakaoRoomUrl);
    } else {
      useToastStore.getState().showToast({ content: '올바르지 않은 링크입니다! 관리자에게 문의해주세요!' });
    }
  };

  const matchingApproveModalConfig = {
    visible: isMatchingApproveModalVisible,
    onClose: () => setMatchingApproveModalVisible(false),
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

  return (
    <S.ContainerViewStyled>
      <TouchableOpacity onPress={handlePostcardClick} style={{ backgroundColor: '#ECEDEF' }}>
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
        {[EPostcardStatus.READ, EPostcardStatus.ACCEPT].includes(postcardStatus) && <S.BookImageWrapper />}
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
      <CustomModal modalConfig={matchingApproveModalConfig}>
        <View>
          <ModalUserInfoViewStyled>
            <CircularImage source={{ uri: memberProfileImageUrl }} resizeMode="cover" />
            <UserInfoWrapper>
              <UserInfoNameWrapper>
                <UserNameText style={{ fontSize: 16 }}>{`${memberName} | ${memberAge}`}</UserNameText>
                <GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
              </UserInfoNameWrapper>
              <ModalSchoolNameText>{memberSchoolName}</ModalSchoolNameText>
            </UserInfoWrapper>
          </ModalUserInfoViewStyled>
          <ModalBookListContainer>
            {bookImageUrls?.map((bookImageUrl) => (
              <ModalBookWrapper>
                <ModalBookImage source={bookImageUrl ? { uri: bookImageUrl } : img.prepareBookImage} />
              </ModalBookWrapper>
            ))}
          </ModalBookListContainer>
          <ModalBookShelves style={styles.Shadow} />
        </View>
      </CustomModal>
    </S.ContainerViewStyled>
  );
};
