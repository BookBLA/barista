import { colors } from '@commons/styles/variablesStyles';
import { deviceHeight, deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const ReadingQuizInfoContainer = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px 0;
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

export const StepProgressBar = styled.View`
  
`;

export const PreviousStepImage = styled.Image`
  width: 14px;
  height: 14px;
`;

export const StepImage = styled.Image`
  width: 16px;
  height: 16px;
`;

export const StepName = styled.View`

`

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

export const AnswerCheckbox = styled.View`
  display: flex;
  flex-direction: row;
  border-radius: 10px;
  border-width: 2px;
  width: 100%;
  padding: 11px 16px;
  margin: 6px 0;
  background-color: white;
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
