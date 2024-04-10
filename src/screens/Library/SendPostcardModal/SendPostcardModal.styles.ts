import styled from 'styled-components/native';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { colors } from '../../../commons/styles/variablesStyles';

export const SendPostcardModalContainer = styled.View`
  padding: 0 16px;
`;

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
  margin: 20px 0;
  border: 1px dashed #d2d6e2;
`;

export const BookQuizContainer = styled.View``;

export const BookQuizTitleWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;
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
  padding: 0 12px;
  justify-content: center;
`;

export const BottomButtonContainer = styled.View`
  margin-top: 12px;
  margin-bottom: 20px;
  flex-direction: row;
  justify-content: ${(props: { isSingle: boolean }) => (props.isSingle ? 'flex-end' : 'space-between')};
`;

export const BottomArrowButton = styled.Image`
  width: 11px;
  height: 15px;
`;
