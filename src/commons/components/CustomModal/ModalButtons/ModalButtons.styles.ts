import styled from 'styled-components/native';
import { IStyledProps } from './ModalButtons.types';
import { colors } from '../../../styles/variablesStyles';

export const BottomWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 15px;
  height: 11px;
`;

export const RoundButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${({ width }: IStyledProps) => width};
  height: 36px;
  padding: 9px 40px;
  border-radius: 60px;
  font-family: 'fontMedium';
  font-size: 16px;
  background-color: ${({ bgColor }: IStyledProps) => bgColor || colors.primary};
`;
