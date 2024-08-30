import { colors } from '@commons/styles/variablesStyles';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';
import { LinearGradient } from 'expo-linear-gradient';

export const StepProgressBar = styled.View`
  margin-top: 15px;
  margin-bottom: auto;
  padding: 0 10px;
  width: 45%;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: blueviolet;
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
  color: black;
  text-align: center;
`;

export const ReadingQuizInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 10px 0;
  background-color: cornflowerblue;
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
  background-color: darkblue;
`;

export const ReadingQuizTestContainer = styled.View`
  display: flex;
  background-color: gainsboro;
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

export const NextButton = styled.TouchableOpacity`
  margin-top: auto;
  margin-bottom: 20px;
  width: 90%;
  height: 56px;
  background-color: ${colors.primary02};
  border-radius: 10px;
  align-items: center;
  justify-content: center;
`;

export const CompletionContainer = styled.View`
  margin-top: auto;
  width: 90%;
  height: ${deviceHeight * 0.7}px;
  border-radius: 10px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  background-color: cornflowerblue;
`;

export const CompletionImage = styled.Image`
  margin-bottom: 50px;
  width: 126px;
  height: 161px;
`;
