import styled from 'styled-components/native';
import { deviceHeight, deviceWidth } from '../../../commons/utils/dimensions';
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

export const PersonalQuestionContainer = styled.View``;

export const PostcardSelectionContainer = styled.View`
  margin-bottom: 16px;
`;

export const PersonalQuestionHeaderWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
`;

export const PersonalQuestionAnswerInputBox = styled.TextInput`
  width: 100%;
  height: 120px;
  padding: 20px;
  border-radius: 10px;
  background-color: #fff5d6;
  font-size: 14px;
  font-family: fontMedium;
  margin-bottom: 4px;
`;

export const PersonalQuestionAnswerTextLengthView = styled.View`
  align-items: flex-end;
`;

export const PostcardImageListWrapper = styled.View`
  flex-direction: row;
  gap: 12px;
  margin: 12px 0;
`;

export const PostcardImageWrapper = styled.View`
  width: ${deviceWidth / 4 + 12}px;
  justify-content: center;
  align-items: center;
`;

export const PostcardImage = styled.Image`
  width: 100%;
  height: ${deviceHeight / 5 - 24}px;
  border-radius: 10px;
  object-fit: fill;
`;

export const TransparentWrapper = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* 투명한 배경색 */
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const CheckIcon = styled.Image`
  width: 52px;
  height: 52px;
  position: absolute;
`;
