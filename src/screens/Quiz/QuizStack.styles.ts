import { colors } from '@commons/styles/variablesStyles';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const Wrapper = styled.Pressable`
  position: relative;
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
  padding: 64px 16px 20px;
`;

export const StepProgressBar = styled.View`
  margin-top: 15px;
  margin-bottom: 25px;
  padding: 0 10px;
  width: 45%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const StepLineFirst = styled(LinearGradient).attrs({
  colors: ['#AFDFF8', '#D6EFFB', '#ECECEC', '#EBEFF2', '#EDEEF2'],
  locations: [0, 0.1, 0.4, 0.49, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  margin: 0 15px;
  width: 90%;
  height: 2px;
  position: absolute;
  z-index: 0;
`;

export const StepLineSecond = styled(LinearGradient).attrs({
  colors: ['#ECECEC', '#D6EFFB', '#AFDFF8', '#B0DFF8', '#D6EFFB', '#ECEDEF', '#EDEEF2'],
  locations: [0, 0.1, 0.4, 0.49, 0.73, 0.9, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  margin: 0 15px;
  width: 90%;
  height: 2px;
  position: absolute;
  z-index: 0;
`;

export const StepLineThird = styled(LinearGradient).attrs({
  colors: ['#EDEEF2', '#EDEEF0', '#E6F5FD', '#D6EFFB', '#AFDFF8'],
  locations: [0.4, 0.51, 0.68, 0.9, 1],
  start: { x: 0, y: 0 },
  end: { x: 1, y: 0 },
})`
  margin: 0 15px;
  width: 90%;
  height: 2px;
  position: absolute;
  z-index: 0;
`;

export const StepImage = styled.View`
  position: relative;
`;

export const StepName = styled.Text`
  width: 50px;
  position: absolute;
  left: 50%;
  margin-left: -25px;
  bottom: -15px;
  font-size: 10px;
  color: white;
  text-align: center;
`;

export const ReadingQuizInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
`;

export const BookImage = styled.Image`
  border-radius: 10px;
  border-width: 2px;
  border-color: ${colors.buttonNavStroke};
  overflow: hidden;
  width: ${deviceWidth * 0.22}px;
  height: ${deviceHeight * 0.15}px;
`;

export const BookTextContainer = styled.View`
  margin-top: 19px;
`;

export const BookTitleWrapper = styled.View`
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`;

export const ReadingQuizTestContainer = styled.KeyboardAvoidingView`
  display: flex;
  background-color: white;
  margin: 20px;
  padding: 20px;
  width: 90%;
  border-radius: 10px;
`;

export const QuizTitleContainer = styled.View`
  margin-bottom: 30px;
  text-wrap: pretty;
`;

export const AnswerCheckboxContainer = styled.View`
  display: flex;
  align-items: space-between;
`;

export const AnswerCheckbox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border-width: 2px;
  width: 100%;
  padding: 11px 16px;
  margin: 6px 0;
`;

export const AnswerCheckRadioButton = styled.Image`
  margin-left: auto;
  width: 22px;
  height: 22px;
`;

export const TextSection = styled.TextInput`
  padding: 20px;
  width: 100%;
  height: 145px;
  text-align-vertical: top;
  border-width: 1px;
  border-color: #00000015;
  border-radius: 10px;
  font-size: 14px;
  color: black;
`;

export const TextCount = styled.Text`
  margin-top: 6px;
  text-align: right;
`;

export const PostCardImageListWrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const PostCardImageWrapper = styled.View`
  position: relative;
  margin: 0 7px;
  width: 114px;
  height: 170px;
  border-radius: 10px;
  overflow: hidden;
  justify-content: center;
  align-items: center;
`;

export const PostCardImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;

export const PostCardSelectedBackground = styled.View`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #00000066;
  z-index: 10;
`;

export const PostCardSelectedImage = styled.Image`
  position: absolute;
  width: 60px;
  height: 42px;
  top: 50%;
  margin-top: -21px;
  left: 50%;
  margin-left: -30px;
  z-index: 20;
  object-fit: fill;
`;

export const NextButton = styled.TouchableOpacity`
  margin-top: auto;
  margin-bottom: 20px;
  width: 90%;
  height: 56px;
  background-color: ${colors.primary02};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

export const NextButtonText = styled.Text`
  color: black;
  font-weight: 500;
  font-size: 16px;
`;

export const CompletionContainer = styled.View`
  margin-top: auto;
  width: 90%;
  height: ${deviceHeight * 0.66}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: white;
`;

export const CompletionBackground = styled.Image`
  position: absolute;
  top: 5px;
  width: 97%;
  height: 65%;
  background: transparent;
`;

export const CompletionImage = styled.Image`
  margin-bottom: 50px;
  width: 126px;
  height: 161px;
`;
