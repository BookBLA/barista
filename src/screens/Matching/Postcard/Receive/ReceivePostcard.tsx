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

import { useSendbirdChat } from '@sendbird/uikit-react-native/src/hooks/useContext';
import { useNavigation } from '@react-navigation/native';

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
  const logEvent = useAnalyticsEventLogger();
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

    if ([EPostcardStatus.READ, EPostcardStatus.ACCEPT].includes(postcardStatus)) {
      navigation.navigate('chat', {
        screen: 'GroupChannelList',
      });
    } else {
      if (memberPostcard > 0) {
        toggleCheckBeforeSendPostcardModal();
      } else {
        toggleNoPostcardModal();
      }
    }
    // studentIdToggle();
  };

  const showPostcardDetail = async () => {
    try {
      const { result } = await readPostcard(postcardId);
      toggleCheckBeforeSendPostcardModal();

      // TODO: 학생증 인증 체크
      // @ts-ignore
      const channel = sdk.groupChannel.getChannel(result.channelUrl);
      await channel.then((res) => {
        res.unhide();
        console.log(res);
        navigation.navigate('chat', {
          screen: 'GroupChannelList',
        });
        // navigation.navigate('chat', {
        //   screen: 'GroupChannel',
        //   params: {
        //     channelUrl: result.url,
        //   },
        // });
      });
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
