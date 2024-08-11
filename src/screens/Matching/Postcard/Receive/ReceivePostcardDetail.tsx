import { Platform, ScrollView, View } from 'react-native';
import React, { useCallback, useMemo, useState } from 'react';
import useMovePage from '../../../../commons/hooks/navigations/movePage/useMovePage';
import * as S from './ReceivePostcardDetail.styles';
import { PersonalQuizAnswerBox, UserStyleBox } from './ReceivePostcardDetail.styles';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { EGender, EPostcardStatus } from '../Send/SendPostcard.types';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { IReceivePostcardProps } from './ReceivePostcard.types';
import { getReceivePostcardList, postPostcardStatusUpdate } from '../../../../commons/api/matching/matching.api';
import useToastStore from '../../../../commons/store/useToastStore';
import useModalStore from '../../../../commons/store/useModalStore';
import reportIcon from '../../../../../assets/images/icons/ReportIcon.png';
import { useBottomSheet } from '../../../../commons/hooks/ui/bottomSheet/useBottomSheet';
import CustomBottomSheetModal from '../../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import ReportOption from '../../../Library/utils/ReportOption/ReportOption';
import useScreenLogger from '../../../../commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { getYourLibraryInfo } from '../../../../commons/api/postcard/library.api';
import useHeaderControl from '../../../../commons/hooks/ui/headerControl/useHeaderControl';

type RootStackParamList = {
  ReceivePostcardDetail: IReceivePostcardProps;
};

type ReceivePostcardDetailRouteProp = RouteProp<RootStackParamList, 'ReceivePostcardDetail'>;

type Props = {
  route: ReceivePostcardDetailRouteProp;
};

const ReceivePostcardDetail: React.FC<Props> = ({ route }) => {
  useScreenLogger();
  const {
    postcardId,
    memberId,
    bookImageUrls,
    memberOpenKakaoRoomUrl,
    memberName,
    memberAge,
    memberGender,
    memberSchoolName,
    memberProfileImageUrl,
  } = route.params ?? {};

  const [postcardDetails, setPostcardDetails] = useState<IReceivePostcardProps | null>(null);
  const styleList = [
    postcardDetails?.mbti,
    postcardDetails?.drinkType,
    postcardDetails?.smokeType,
    postcardDetails?.contactType,
    postcardDetails?.dateStyleType,
    postcardDetails?.dateCostType,
  ];
  const quizCircleList = ['A', 'B', 'C', 'D', 'E'];
  const { movePage, movePageNoReference } = useMovePage();
  const { isMatchingApproveModalVisible, setMatchingApproveModalVisible, setMatchingApproveModalData } =
    useModalStore();

  const reportSnapPoints = useMemo(() => ['80%'], []);

  const fetchPostcardDetails = useCallback(async () => {
    try {
      const responseList = await getReceivePostcardList();
      const result = responseList.find((response) => response.postcardId === postcardId);
      setPostcardDetails(result!);
    } catch (error) {
      console.error('error', error);
    }
  }, []);

  const toggleMatchingApproveModal = () => {
    setMatchingApproveModalVisible(!isMatchingApproveModalVisible);
  };

  const rejectPostcard = async () => {
    try {
      await postPostcardStatusUpdate({ postcardId, status: EPostcardStatus.REFUSED });
      movePageNoReference();
      useToastStore.getState().showToast({ content: '엽서를 거절하였습니다.' });
    } catch (error) {
      console.error('error', error);
    }
  };

  const acceptPostcard = async () => {
    try {
      await postPostcardStatusUpdate({ postcardId, status: EPostcardStatus.ACCEPT });
      const response = await getYourLibraryInfo(memberId);
      const bookImageUrls = response.bookResponses.map((book: { bookImageUrl: string }) => book.bookImageUrl);
      setMatchingApproveModalData({
        memberId,
        memberName,
        memberAge,
        memberGender,
        memberSchoolName,
        memberProfileImageUrl,
        memberOpenKakaoRoomUrl,
        bookImageUrls,
      });
      toggleMatchingApproveModal();
      movePageNoReference();
      useToastStore.getState().showToast({ content: '엽서를 수락하였습니다.' });
    } catch (error) {
      console.error('error', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchPostcardDetails();
    }, [fetchPostcardDetails]),
  );

  const reportBottomSheet = useBottomSheet();
  const snapPoints = useMemo(() => ['15%', '30%', '50%', '70%', '93%'], []);

  useHeaderControl({
    title: '받은 엽서',
    left: true,
    right: {
      image: reportIcon,
      onPress: () => reportBottomSheet.handleOpenBottomSheet(),
    },
  });

  const platformBlurRadius = Platform.select({
    ios: postcardDetails?.postcardStatus === EPostcardStatus.ACCEPT ? 0 : 9,
    android: postcardDetails?.postcardStatus === EPostcardStatus.ACCEPT ? 0 : 30,
  });

  return (
    <ScrollView alwaysBounceHorizontal={false} style={{ flex: 1, backgroundColor: 'white' }} overScrollMode="never">
      <S.Wrapper>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          {/* <S.HeaderView>
            <TouchableOpacity onPress={movePage()}>
              <S.HeaderImage source={prevButtonBlack} />
            </TouchableOpacity>
            <S.HeaderTextWrapper>
              <S.HeaderText>받은 엽서</S.HeaderText>
            </S.HeaderTextWrapper>
          </S.HeaderView> */}

          <S.UserInfoContainerView>
            <S.UserInfoView>
              <S.CircularImage
                source={{ uri: postcardDetails?.memberProfileImageUrl }}
                blurRadius={platformBlurRadius}
              />
              <S.UserInfoWrapper>
                <S.UserInfoNameWrapper>
                  <S.UserNameText>
                    {postcardDetails?.memberName} | {postcardDetails?.memberAge}
                  </S.UserNameText>
                  <S.GenderIconStyled source={postcardDetails?.memberGender === EGender.MALE ? manIcon : womanIcon} />
                </S.UserInfoNameWrapper>
                <S.SchoolNameText>{postcardDetails?.memberSchoolName}</S.SchoolNameText>
              </S.UserInfoWrapper>
            </S.UserInfoView>

            <S.UserLibraryButtonContainer
              onPress={movePage('library', {
                memberId: postcardDetails?.memberId,
                postcardId,
                isYourLibrary: true,
              })}
            >
              <S.UserLibraryButtonText>상대방 서재 보러가기</S.UserLibraryButtonText>
            </S.UserLibraryButtonContainer>
          </S.UserInfoContainerView>

          <S.DividerLine />

          <S.BodyView>
            <S.QuizStatusView>
              <S.QuizStatusTitle>퀴즈 맞춤 여부</S.QuizStatusTitle>
              {postcardDetails?.bookTitles.map((bookTitle, index) => (
                <S.QuizInfoView
                  key={index}
                  style={[{ flex: 1 }, index === bookTitle.length - 1 && { marginBottom: 0 }]}
                >
                  <S.QuizCircle isCorrect={postcardDetails?.correctStatuses[index] !== 'WRONG'}>
                    <S.QuizCircleText>{quizCircleList[index]}</S.QuizCircleText>
                  </S.QuizCircle>
                  <S.QuizBookTitleWrapper>
                    <S.QuizBookTitleText>{bookTitle}</S.QuizBookTitleText>
                  </S.QuizBookTitleWrapper>
                </S.QuizInfoView>
              ))}
            </S.QuizStatusView>

            <S.DashLineView />

            <S.UserStyleView>
              <CustomText size="16px" font="fontMedium">
                스타일
              </CustomText>
              <S.UserStyleBoxContainer>
                {styleList.map((style, index) => (
                  <UserStyleBox key={index}>
                    <CustomText size="12px" font="fontLight">
                      {style}
                    </CustomText>
                  </UserStyleBox>
                ))}
              </S.UserStyleBoxContainer>
            </S.UserStyleView>

            <S.DashLineView />

            <S.UserStyleView>
              <CustomText size="16px" font="fontMedium">
                남사친 / 여사친
              </CustomText>
              <S.UserStyleBoxContainer>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    {postcardDetails?.justFriendType}
                  </CustomText>
                </UserStyleBox>
              </S.UserStyleBoxContainer>
            </S.UserStyleView>

            <S.DashLineView />

            <S.UserStyleView>
              <CustomText size="16px" font="fontMedium">
                개인 질문 답
              </CustomText>
              <S.UserStyleBoxContainer>
                <PersonalQuizAnswerBox>
                  <CustomText size="14px" font="fontLight">
                    {postcardDetails?.memberReplyContent}
                  </CustomText>
                </PersonalQuizAnswerBox>
              </S.UserStyleBoxContainer>
            </S.UserStyleView>

            <S.ButtonContainer>
              <S.Button type="reject" onPress={async () => await rejectPostcard()}>
                <CustomText size="14px" font="fontMedium" color="white">
                  거절하기
                </CustomText>
              </S.Button>
              <S.Button onPress={async () => await acceptPostcard()}>
                <CustomText size="14px" font="fontMedium" color={colors.textYellow}>
                  수락하기
                </CustomText>
              </S.Button>
            </S.ButtonContainer>
          </S.BodyView>
          <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
            <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} reportedMemberId={memberId} />
          </CustomBottomSheetModal>
        </View>
      </S.Wrapper>
    </ScrollView>
  );
};

export default ReceivePostcardDetail;
