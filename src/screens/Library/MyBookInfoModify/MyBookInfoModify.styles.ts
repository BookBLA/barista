import styled from 'styled-components/native';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { colors } from '../../../commons/styles/variablesStyles';

export const BookInfoContainer = styled.View`
  flex-direction: row;
`;
export const BookWrapper = styled.View`
  flex: 0.8;
  justify-content: center;
  align-items: center;
`;

export const BookImage = styled.Image`
  width: 100%;
  height: ${deviceHeight / 5 - 50}px;
  border-radius: 10px;
  object-fit: fill;
`;

export const BookTitleWrapper = styled.View`
  flex: 2;
  justify-content: flex-end;
  padding-left: 8px;
`;

export const DashLine = styled.View`
  width: 100%;
  margin: 16px 0;
  border: 1px dashed #d2d6e2;
`;

export const BookReviewContainer = styled.View``;

export const BookReviewHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const ModifyButton = styled.TouchableOpacity`
  background-color: #f5f0e2;
  padding: 4px 16px;
  border-radius: 14px;
`;

export const BookReviewWrapper = styled.View`
  width: 100%;
  height: 120px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff5d6;
`;

export const BookReviewInputBox = styled.TextInput`
  width: 100%;
  height: 120px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff5d6;
  font-size: 14px;
  font-family: fontMedium;
`;

export const BookReviewLengthView = styled.View`
  align-items: flex-end;
`;

export const BookQuizContainer = styled.View`
  margin-bottom: 12px;
`;

export const BookQuizHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const BookQuizQuestionWrapper = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: 12px;
  padding: 10px;
`;

export const BookQuizQuestionInputBox = styled.TextInput`
  width: 100%;
  height: 50px;
  font-size: 14px;
  font-family: fontMedium;
  font-weight: bold;
  margin-bottom: 12px;
  background-color: #fafafa;
  border-radius: 10px;
  padding: 10px;
`;

export const BookQuizAnswerContainer = styled.View``;

export const BookQuizInfoView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
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
  font-size: 12px;
  color: ${colors.textYellow};
  font-family: fontLight;
`;
export const BookQuizAnswerWrapper = styled.View`
  justify-content: center;
  border-radius: 20px;
  background-color: #fff5d6;
  margin-left: 12px;
  flex: 1;
`;

export const BookQuizAnswerView = styled.View`
  flex: 1;
  width: 100%;
  padding: 14px;
  color: black;
  justify-content: center;
`;

export const BookQuizAnswerInputBox = styled.TextInput`
  flex: 1;
  font-size: 14px;
  font-family: fontLight;
  padding: 14px;
  color: black;
  justify-content: center;
  align-items: center;
  background-color: #f5f0e2;
  border-radius: 20px;
`;

export const BookRemoveButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #e65d5d;
  padding: 14px 30px;
  border-radius: 24px;
`;
