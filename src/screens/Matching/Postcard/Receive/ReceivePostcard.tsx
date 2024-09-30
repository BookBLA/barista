import manIcon from '@assets/images/icons/ManSmall.png';
import womanIcon from '@assets/images/icons/WomanSmall.png';
import { readPostcard } from '@commons/api/matching/matching.api';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useFetchMemberPostcard from '@commons/hooks/datas/MemberPostcard/useMemberPostcard';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useModalStore from '@commons/store/ui/modal/useModalStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { icons, img } from '@commons/utils/ui/variablesImages/variablesImages';
import React, { useState } from 'react';
import { Image, Linking, TouchableOpacity, View } from 'react-native';
import {
  CircularImage,
  GenderIconStyled,
  ModalBookImage,
  ModalBookListContainer,
  ModalBookShelves,
  ModalBookWrapper,
  ModalSchoolNameText,
  ModalUserInfoViewStyled,
  UserInfoNameWrapper,
  UserInfoWrapper,
  UserNameText,
  styles,
} from '../Send/SendPostcard.styles';
import { EGender, EPostcardStatus } from '../Send/SendPostcard.types';
import * as S from './ReceivePostcard.styles';
import { IReceivePostcardProps } from './ReceivePostcard.types';

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
  const { isMatchingApproveModalVisible, setMatchingApproveModalVisible, modalData } = useModalStore();
  const logEvent = useAnalyticsEventLogger();
  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });

  const toggleNoPostcardModal = () => {
    setModalVisible(!isNoPostcardModalVisible);
  };

  const toggleCheckBeforeSendPostcardModal = () => {
    setCheckBeforeSendPostcardModalVisible(!isCheckBeforeSendPostcardModalVisible);
  };

  const handlePostcardClick = async () => {
    if ([EPostcardStatus.READ, EPostcardStatus.ACCEPT].includes(postcardStatus)) {
      // movePageNoReference('receivePostcardDetail', rest);
      console.log('move to chat');
    } else {
      if (memberPostcard > 0) {
        toggleCheckBeforeSendPostcardModal();
      } else {
        toggleNoPostcardModal();
      }
    }
    studentIdToggle;
    console.log('studentIdToggle', studentIdToggle);
  };

  const showPostcardDetail = async () => {
    try {
      await readPostcard(postcardId);
      toggleCheckBeforeSendPostcardModal();

      // movePageNoReference('receivePostcardDetail', rest);
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
    const supported = await Linking.canOpenURL(modalData.memberOpenKakaoRoomUrl);
    logEvent('move_open_kakao_chat', { targetMemberId: memberId });

    if (supported) {
      await Linking.openURL(modalData.memberOpenKakaoRoomUrl);
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
            <S.PostcardTextViewStyled
              style={{ fontSize: 14 }}
            >{`${memberName} ${memberAge}살 `}</S.PostcardTextViewStyled>
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
            책갈피 5개를 사용해 받은 엽서를 열어보시겠어요?
          </CustomText>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleCheckBeforeSendPostcardModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                다음에 보기
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={showPostcardDetail} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                엽서 보기
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>
      <CustomModal modalConfig={noPostcardModalConfig}>
        <S.EmptyPostcardModalWrapper>
          <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
            책갈피가 부족합니다.
          </CustomText>
          <CustomText font="fontRegular" size="12px">
            책갈피를 충전하고 받은 엽서를 확인해보세요!
          </CustomText>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleNoPostcardModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                다음에 하기
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={moveProductScreen} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                충전하기
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>
      <CustomModal modalConfig={matchingApproveModalConfig}>
        <View>
          <ModalUserInfoViewStyled>
            <CircularImage source={{ uri: modalData.memberProfileImageUrl }} resizeMode="cover" />
            <UserInfoWrapper>
              <UserInfoNameWrapper>
                <UserNameText
                  style={{ fontSize: 16 }}
                >{`${modalData.memberName} | ${modalData.memberAge}`}</UserNameText>
                <GenderIconStyled source={modalData.memberGender === EGender.MALE ? manIcon : womanIcon} />
              </UserInfoNameWrapper>
              <ModalSchoolNameText>{modalData.memberSchoolName}</ModalSchoolNameText>
            </UserInfoWrapper>
          </ModalUserInfoViewStyled>
          <ModalBookListContainer>
            {modalData.bookImageUrls?.map((bookImageUrl, index) => (
              <ModalBookWrapper>
                {index === 0 && (
                  <Image
                    style={{ width: 15, height: 30, position: 'absolute', zIndex: 3, left: deviceWidth / 5, top: -3 }}
                    source={icons.bookmark}
                  />
                )}
                <ModalBookImage source={bookImageUrl ? { uri: bookImageUrl } : img.prepareBookImage} />
              </ModalBookWrapper>
            ))}
          </ModalBookListContainer>
          <ModalBookShelves style={styles.Shadow} />
        </View>
      </CustomModal>
      <CustomModal modalConfig={studentIdModalConfig} />
    </S.ContainerViewStyled>
  );
};
