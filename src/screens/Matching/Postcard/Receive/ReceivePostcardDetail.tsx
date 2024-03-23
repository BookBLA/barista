import { ScrollView, TouchableOpacity, View } from 'react-native';
import React from 'react';
import prevButtonBlack from '../../../../../assets/images/buttons/prevButtonBlack.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import * as S from './ReceivePostcardDetail.styles';
import { PersonalQuizAnswerBox, UserStyleBox } from './ReceivePostcardDetail.styles';
import { RouteProp } from '@react-navigation/native';
import postcardImage from '../../../../../assets/images/example-postcard.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { EGender } from '../Send/SendPostcard.types';
import { colors } from '../../../../commons/styles/variablesStyles';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';

type RootStackParamList = {
  ReceivePostcardDetail: { postcardId: number };
};

type ReceivePostcardDetailRouteProp = RouteProp<RootStackParamList, 'ReceivePostcardDetail'>;

type Props = {
  route: ReceivePostcardDetailRouteProp;
};

const ReceivePostcardDetail: React.FC<Props> = ({ route }) => {
  const { movePage } = useMovePage();
  const { postcardId } = route.params;

  return (
    <>
      <View style={{ backgroundColor: 'white' }}>
        <S.HeaderView>
          <TouchableOpacity onPress={movePage()}>
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
                  <S.UserNameText>방근호 | 21</S.UserNameText>
                  <S.GenderIconStyled source={EGender.MAN ? manIcon : womanIcon} />
                </S.UserInfoNameWrapper>
                <S.SchoolNameText>가천대</S.SchoolNameText>
              </S.UserInfoWrapper>
            </S.UserInfoView>

            <S.UserLibraryButtonContainer>
              <S.UserLibraryButtonText>상대방 서재 보러가기</S.UserLibraryButtonText>
            </S.UserLibraryButtonContainer>
          </S.UserInfoContainerView>

          <S.DividerLine />

          <S.BodyView>
            <S.QuizStatusView>
              <S.QuizStatusTile>퀴즈 맞춤 여부</S.QuizStatusTile>
              {/*todo 나중에 반복저으로 보이게 변경*/}
              <S.QuizInfoView>
                <S.QuizCircle isCorrect>
                  <S.QuizCircleText>A</S.QuizCircleText>
                </S.QuizCircle>
                <S.QuizBookTitleWrapper>
                  <S.QuizBookTitleText>
                    첫 번째 등록 책의 제목이 들어갈 자리입니다.첫 번째 등록 책의 제목이 들어갈 자리입니다.
                  </S.QuizBookTitleText>
                </S.QuizBookTitleWrapper>
              </S.QuizInfoView>
              <S.QuizInfoView>
                <S.QuizCircle isCorrect={false}>
                  <S.QuizCircleText>B</S.QuizCircleText>
                </S.QuizCircle>
                <S.QuizBookTitleWrapper>
                  <S.QuizBookTitleText>두 번째 등록 책의 제목이 들어갈 자리입니다.</S.QuizBookTitleText>
                </S.QuizBookTitleWrapper>
              </S.QuizInfoView>
              <S.QuizInfoView style={{ marginBottom: 0 }}>
                <S.QuizCircle isCorrect>
                  <S.QuizCircleText>C</S.QuizCircleText>
                </S.QuizCircle>
                <S.QuizBookTitleWrapper>
                  <S.QuizBookTitleText>세 번째 등록 책의 제목이 들어갈 자리입니다.</S.QuizBookTitleText>
                </S.QuizBookTitleWrapper>
              </S.QuizInfoView>
            </S.QuizStatusView>

            <S.DashLineView />

            <S.UserStyleView>
              {/*todo data foreach로 구현하기*/}
              <CustomText size="16px" font="fontMedium">
                스타일
              </CustomText>
              <S.UserStyleBoxContainer>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    ENEJ
                  </CustomText>
                </UserStyleBox>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    비흡연
                  </CustomText>
                </UserStyleBox>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    음주 1회
                  </CustomText>
                </UserStyleBox>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    할 일 다하고 연락해
                  </CustomText>
                </UserStyleBox>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    야외 데이트 선호
                  </CustomText>
                </UserStyleBox>
                <UserStyleBox>
                  <CustomText size="12px" font="fontLight">
                    여유있는 사람이 좀 더
                  </CustomText>
                </UserStyleBox>
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
                    단둘이 영화 보기까지 가능
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
                    단둘이 영화 보기까지 가능 단둘이 영화 보기까지 가능단둘이 영화 보기까지 가능단둘이 영화 보기까지
                    가능단둘이 영화 보기까지 가능단둘이 영화 보기까지 가능단둘이 영화 보기까지 가능 단둘이 영화 보기까지
                    가능
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
