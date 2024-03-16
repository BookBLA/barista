import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { StyleSheet } from 'react-native';

export const HeaderView = styled.View`
  flex-direction: row;
  width: 100%;
  color: white;
  margin: 20px 0;
`;

export const HeaderImage = styled.Image`
  width: 24px;
  height: 24px;
`;

export const HeaderTextWrapper = styled.View`
  flex: 1;
  margin-right: 20px;
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

export const BodyView = styled.View`
  padding: 14px 0;
`;

export const QuizStatusView = styled.View`
  padding: 16px;
  border-radius: 10px;
  background-color: #ffebac;
  justify-content: center;
`;

export const QuizStatusTile = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  margin-bottom: 12px;
`;

export const QuizInfoView = styled.View`
  flex-direction: row;
  margin-bottom: 8px;
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
  margin: 0 12px;
  align-items: center;
  justify-content: center;
`;
export const QuizBookTitleText = styled.Text`
  font-size: 14px;
  font-family: fontLight;
  color: black;
`;

export const dashLineViewStyled = styled.View`
  margin-top: 16px;
  margin-bottom: 8px;
  border: 1px dashed #d2d6e2;
`;

export const PostcardInfoViewStyled = styled.View`
  background: #1d2e61;
  height: 20%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 4px 8px;
`;

export const PostcardTextViewStyled = styled.Text`
  color: ${colors.textYellow};
`;

export const PostcardInfoFirstViewStyled = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const ButtonContainerViewStyled = styled.View`
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: ${(props: any) => props.fontColor ?? 'white'};
  text-align: center;
  font-size: 14px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  margin-right: ${(props: any) => (props.left ? '4px' : 0)};
  margin-left: ${(props: any) => (props.right ? '4px' : 0)};
  background-color: ${(props: any) => props.backgroundColor ?? 'black'};
`;

export const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: '80%',
  },
});
