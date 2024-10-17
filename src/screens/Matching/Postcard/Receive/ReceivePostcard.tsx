import { useNavigation } from '@react-navigation/native';
import _ from 'lodash';
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { EMemberStatus } from '@commons/types/memberStatus';
import { EPostcardStatus } from '../Send/SendPostcard.types';
import * as S from './ReceivePostcard.styles';
import { IReceivePostcardProps } from './ReceivePostcard.types';

import { readPostcard } from '@commons/api/matching/matching.api';
import { getMemberApi } from '@commons/api/members/default/member.api';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { getStudentIdConfig } from '@commons/configs/StudentIdModal/studentIdConfig';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useFetchMemberPostcard from '@commons/hooks/datas/MemberPostcard/useMemberPostcard';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';

import { useStudentIdStatus } from '@commons/hooks/datas/studentIdStatus/useStudentIdStatus';
import { useApprovalStatus } from '@commons/hooks/ui/approvalStatus/useApprovalStatus';
import { useSendbirdChat } from '@sendbird/uikit-react-native/src/hooks/useContext';

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
  const { getStudentIdStatus } = useStudentIdStatus();
  const { handleApprovalStatus } = useApprovalStatus();
  const logEvent = useAnalyticsEventLogger();
  const showToast = useToastStore((state) => state.showToast);

  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const studentIdImageStatus = useMemberStore((state) => state.memberInfo.studentIdImageStatus);
  const { updateMemberInfo } = useMemberStore();
  const [, forceRender] = useState(0);

  const { toggle: studentIdToggle, isOpen } = useToggle();
  const studentIdModalConfig = getStudentIdConfig({
    isOpen,
    studentIdToggle,
  });
  const { sdk } = useSendbirdChat();
  const navigation = useNavigation<any>();

  const toggleNoPostcardModal = () => {
    setModalVisible(!isNoPostcardModalVisible);
  };

  const toggleCheckBeforeSendPostcardModal = () => {
    setCheckBeforeSendPostcardModalVisible(!isCheckBeforeSendPostcardModalVisible);
  };

  const handlePostcardClick = async () => {
    let studentStatus = null;
    if (memberStatus === EMemberStatus.REJECTED || memberStatus === EMemberStatus.APPROVAL) {
      studentStatus = await getStudentIdStatus();

      switch (memberStatus) {
        case EMemberStatus.REJECTED:
          studentIdToggle();
          break;

        case EMemberStatus.APPROVAL:
          handleApprovalStatus(studentStatus || '', studentIdToggle);
          break;
      }
    } else if ([EPostcardStatus.READ, EPostcardStatus.ACCEPT].includes(postcardStatus)) {
      navigation.navigate('chat', {
        screen: 'GroupChannelList',
      });
    } else if (memberStatus === EMemberStatus.COMPLETED) {
      if (memberPostcard > 0) {
        toggleCheckBeforeSendPostcardModal();
      } else {
        toggleNoPostcardModal();
      }
    } else {
      getMemberApi().then((result) => {
        updateMemberInfo('memberStatus', result.result.memberStatus as string);
        forceRender((prev) => prev + 1);
      });
      showToast({
        content: '잠시만 기다려주세요',
      });
    }
  };

  const showPostcardDetail = _.debounce(async () => {
    try {
      await readPostcard(postcardId);
      toggleCheckBeforeSendPostcardModal();
      // await CreateChat(res.result, sdk);

      navigation.navigate('chat', {
        screen: 'GroupChannelList',
      });
      // navigation.navigate('chat', {
      //   screen: 'GroupChannel',
      //   params: {
      //     channelUrl: result.url,
      //   },
      // });
    } catch (error) {
      console.error('error', error);
      useToastStore.getState().showToast({ content: '엽서를 읽을 수 없는 상태입니다.' });
    }
  }, 500);

  const moveProductScreen = () => {
    toggleNoPostcardModal();
    movePageNoReference('HomeStack', {
      screen: 'product',
    });
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

      <CustomModal modalConfig={studentIdModalConfig} />
    </S.ContainerViewStyled>
  );
};
