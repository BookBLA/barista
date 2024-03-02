import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

export const ButtonStyled = styled.TouchableOpacity`
  background: ${(props: any) => props.backgroundColor || colors.buttonPrimary};
  border-radius: 60px;
  padding: 12px 24px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTextStyled = styled.Text`
  color: ${(props: any) => props.fontColor || colors.textYellow};
  font-size: ${(props: any) => props.fontSize || '14px'};
`;
