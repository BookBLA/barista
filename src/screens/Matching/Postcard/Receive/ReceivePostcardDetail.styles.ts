import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { deviceWidth } from '../../../../commons/utils/dimensions';

export const HeaderView = styled.View`
  flex-direction: row;
  width: 100%;
  color: white;
  margin: 16px 0;
`;

export const HeaderImage = styled.Image`
  width: 24px;
  height: 24px;
`;

export const HeaderTextWrapper = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const HeaderText = styled.Text`
  font-family: fontMedium;
`;

export const UserInfoContainerView = styled.View`
  margin: 10px 0;
`;

export const UserInfoView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

export const UserInfoWrapper = styled.View`
  flex: 4;
  padding: 0 8px;
`;

export const UserInfoNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GenderIconStyled = styled.Image`
  width: 20px;
  height: 20px;
`;

export const UserNameText = styled.Text`
  font-size: 20px;
  color: ${colors.textBlack};
  margin-bottom: 4px;
  font-family: fontMedium;
`;

export const SchoolNameText = styled.Text`
  font-size: 14px;
  color: #858585;
  margin-bottom: 8px;
  font-family: fontLight;
`;

export const CircularImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-right: 10px;
`;

export const UserLibraryButtonContainer = styled.TouchableOpacity`
  padding: 10px;
  border-radius: 10px;
  background-color: ${colors.buttonPrimary};
`;

export const UserLibraryButtonText = styled.Text`
  text-align: center;
  font-size: 14px;
  color: ${colors.textYellow};
  font-family: fontMedium;
`;

export const DividerLine = styled.View`
  width: ${deviceWidth}px;
  border: 3px solid #fafafa;
`;

export const BodyView = styled.View`
  padding: 14px 0;
  margin-bottom: 20px;
`;

export const QuizStatusView = styled.View`
  padding: 16px;
  border-radius: 10px;
  background-color: #fff5d6;
  justify-content: center;
`;

export const QuizStatusTile = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  margin-bottom: 15px;
`;

export const QuizInfoView = styled.View`
  flex-direction: row;
  margin-bottom: 10px;
`;

export const QuizCircle = styled.View`
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  background-color: ${(props: any) => (props.isCorrect ? 'green' : 'red')};
`;

export const QuizCircleText = styled.Text`
  font-size: 16px;
  color: ${colors.textYellow};
`;
export const QuizBookTitleWrapper = styled.View`
  align-items: center;
  justify-content: center;
`;
export const QuizBookTitleText = styled.Text`
  font-size: 14px;
  font-family: fontLight;
  color: black;
  margin-left: 12px;
  width: ${deviceWidth - 100}px;
`;

export const DashLineView = styled.View`
  margin: 16px 0;
  border: 1px dashed #d2d6e2;
`;

export const UserStyleView = styled.View`
  margin-bottom: 20px;
`;

export const UserStyleBoxContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 14px;
`;

export const UserStyleBox = styled.View`
  margin: 5px 10px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #fff5d6;
`;

export const PersonalQuizAnswerBox = styled.View`
  width: 100%;
  height: 100%;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff5d6;
`;

export const ButtonContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 50px;
`;

export const Button = styled.TouchableOpacity`
  flex: 1;
  padding: 16px 20px;
  background-color: ${({ type }: any) => (type === 'reject' ? colors.buttonReauth : colors.buttonPrimary)};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
`;
