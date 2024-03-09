import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const ButtonStyled = styled.TouchableOpacity`
  width: 105px;
  height: 44px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
`;

export const LongButtonStyled = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  /* border-radius: 60px; */
  border-radius: 60px;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 80, // 최대 글자 수
  maxLine: 3,
})`
  width: 80%;
  height: 72;
  border-radius: 6px;
  font-size: 16px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  justify-content: center;
  text-align: start;

  flex-shrink: 1;
`;
