import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const InputStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 500, // 최대 글자 수
})`
  width: 90%;
  height: 200px;
  z-index: 2;
  border: 1px solid ${colors.textQaGray};
  border-radius: 10px;
  font-size: 12px;
  padding: 15px;
`;
