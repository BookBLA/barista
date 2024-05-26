import { ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import prevButtonBlack from '../../../../../assets/images/buttons/prevButtonBlack.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import * as S from './ReceivePostcardDetail.styles';
import { PersonalQuizAnswerBox, UserStyleBox } from './ReceivePostcardDetail.styles';
import { RouteProp } from '@react-navigation/native';
import postcardImage from '../../../../../assets/images/example-book.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { EGender } from '../Send/SendPostcard.types';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { IReceivePostcardProps } from './ReceivePostcard.types';

type RootStackParamList = {
  ReceivePostcardDetail: IReceivePostcardProps;
};

type ReceivePostcardDetailRouteProp = RouteProp<RootStackParamList, 'ReceivePostcardDetail'>;

type Props = {
  route: ReceivePostcardDetailRouteProp;
};

const ReceivePostcardDetail: React.FC<Props> = ({ route }) => {
  const { movePage } = useMovePage();
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
  } = route.params;

  const styleList = [mbti, drinkType, smokeType, contactType, dateStyleType, dateCostType];
  const quizCircleList = ['A', 'B', 'C', 'D', 'E'];

  return (
    <>
      <View style={{ backgroundColor: 'white' }}>
        <S.HeaderView>
          <TouchableOpacity onPress={movePage('Matching')}>
            <S.HeaderImage source={prevButtonBlack} />
          </TouchableOpacity>
          <S.HeaderTextWrapper>
            <S.HeaderText>받은 엽서</S.HeaderText>
          </S.HeaderTextWrapper>
        </S.HeaderView>
        <ScrollView alwaysBounceHorizontal={false} style={{ backgroundColor: 'white' }} overScrollMode="never">
          <S.UserInfoContainerView>
            <S.UserInfoView>
              <S.CircularImage source={postcardImage} resizeMode="contain" />
              <S.UserInfoWrapper>
                <S.UserInfoNameWrapper>
                  <S.UserNameText>
                    {memberName} | {memberAge}
                  </S.UserNameText>
                  <S.GenderIconStyled source={memberGender === EGender.MALE ? manIcon : womanIcon} />
                </S.UserInfoNameWrapper>
                <S.SchoolNameText>{memberSchoolName}</S.SchoolNameText>
              </S.UserInfoWrapper>
            </S.UserInfoView>

            <S.UserLibraryButtonContainer onPress={movePage('OtherLibrary', { userId: memberId, isYourLibrary: true })}>
              <S.UserLibraryButtonText>상대방 서재 보러가기</S.UserLibraryButtonText>
            </S.UserLibraryButtonContainer>
          </S.UserInfoContainerView>

          <S.DividerLine />

          <S.BodyView>
            <S.QuizStatusView>
              <S.QuizStatusTitle>퀴즈 맞춤 여부</S.QuizStatusTitle>
              {bookTitles.map((bookTitle, index) => (
                <S.QuizInfoView style={[{ flex: 1 }, index === bookTitle.length - 1 && { marginBottom: 0 }]}>
                  <S.QuizCircle isCorrect={correctStatuses[index] !== 'WRONG'}>
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
                {styleList.map((style) => (
                  <UserStyleBox>
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
                    {justFriendType}
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
                    {memberReplyContent}
                  </CustomText>
                </PersonalQuizAnswerBox>
              </S.UserStyleBoxContainer>
            </S.UserStyleView>

            <S.ButtonContainer>
              {/*todo onPress 구현하기*/}
              <S.Button type="reject">
                <CustomText size="14px" font="fontMedium" color="white">
                  거절하기
                </CustomText>
              </S.Button>
              <S.Button>
                <CustomText size="14px" font="fontMedium" color={colors.textYellow}>
                  수락하기
                </CustomText>
              </S.Button>
            </S.ButtonContainer>
          </S.BodyView>
        </ScrollView>
      </View>
    </>
  );
};

export default ReceivePostcardDetail;
