import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const ButtonStyled = styled.TouchableOpacity`
  background: ${(props: any) => props.backgroundColor || colors.buttonPrimary};
  border-radius: ${(props: any) => props.borderRadius || '60px'};
  padding: ${(props: any) => props.padding || '12px 24px'};
  align-items: ${(props: any) => props.textAlign || 'center'};
  justify-content: center;
  margin: ${(props: any) => props.margin || '0px'};
`;

export const ButtonTextStyled = styled.Text`
  font-family: ${(props: any) => props.fontFamily || 'fontMedium'};
  color: ${(props: any) => props.fontColor || colors.textYellow};
  font-size: ${(props: any) => props.fontSize || '14px'};
  ${(props: any) => props.transparent && 'background-color: transparent'};
`;
