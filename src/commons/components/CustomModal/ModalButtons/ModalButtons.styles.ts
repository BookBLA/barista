import styled from 'styled-components/native';
import { IStyledProps } from './ModalButtons.types';
import { colors } from '../../../styles/variablesStyles';

export const BottomWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 20px;
  gap: 10px;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 15px;
  height: 11px;
`;

export const RoundButton = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 14px 20px;
  border-radius: 60px;
  background-color: ${({ bgColor }: IStyledProps) => bgColor || colors.primary};
`;
