import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const ButtonStyled = styled.TouchableOpacity`
  width: 86%;
  height: 88px;
  border-radius: 10px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
  margin: 7px 0;
`;
export const RowStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 86%;
  margin-bottom: 10px;
`;

export const BoundaryStyled = styled.View`
  height: 0.5px;
  width: 100%;
  border-color: ${colors.lineDivider};
  border-style: dashed;
  border-width: 2px;
`;

export const TextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 100, // 최대 글자 수
})`
  width: 85%;
  height: 13%;
  border-radius: 10px;
  font-size: 14px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  justify-content: center;
  text-align: start;
  padding: 12px;
  padding-top: 12px;
  margin-bottom: 10px;
  flex-shrink: 1;
`;

export const QuizTextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 60, // 최대 글자 수
})`
  width: 86%;
  height: 38px;
  border-radius: 60px;
  padding: 12px;
  font-size: 12px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  align-items: center;
  justify-content: center;
  margin: 7px 0;
  text-align: start;
  padding-left: 16px;
`;
