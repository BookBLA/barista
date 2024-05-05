import styled from 'styled-components/native';
import { colors } from '../../../../../../commons/styles/variablesStyles';

export const TextBox = styled.TextInput.attrs({
  multiline: true,
  maxLength: 100,
})`
  margin-top: 16px;
  padding: 12px 24px;
  border-radius: 60px;
  font-size: 14px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  text-align: 'flex-start';
`;
