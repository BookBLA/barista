import { TouchableOpacity, View } from 'react-native';
import React from 'react';
import prevButtonBlack from '../../../../../assets/images/buttons/prevButtonBlack.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import * as S from './ReceivePostcardDetail.styles';
import { RouteProp } from '@react-navigation/native';
import postcardImage from '../../../../../assets/images/example-postcard.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';
import { EGender } from '../Send/SendPostcard.types';

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

  console.log(route);
  console.log(postcardId);

  return (
    <View style={{ backgroundColor: 'white' }}>
      <S.HeaderView>
        <TouchableOpacity onPress={movePage()}>
          <S.HeaderImage source={prevButtonBlack} />
        </TouchableOpacity>
        <S.HeaderTextWrapper>
          <S.HeaderText>받은 엽서</S.HeaderText>
        </S.HeaderTextWrapper>
      </S.HeaderView>

      <S.UserInfoContainerView>
        <S.UserInfoView>
          <S.CircularImage source={postcardImage} resizeMode="contain" />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText style={{ fontSize: 16 }}>{`방근호 | 21`}</S.UserNameText>
              <S.GenderIconStyled source={EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>{'가천대'}</S.SchoolNameText>
          </S.UserInfoWrapper>
        </S.UserInfoView>

        <S.UserLibraryButtonContainer>
          <S.UserLibraryButtonText>상대방 서재 보러가기</S.UserLibraryButtonText>
        </S.UserLibraryButtonContainer>
      </S.UserInfoContainerView>

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
        <S.dashLineViewStyled />
      </S.BodyView>
      <View>
        <CustomButton contents="거절하기" />
        <CustomButton contents="수락하기" />
      </View>
    </View>
  );
};

export default ReceivePostcardDetail;
