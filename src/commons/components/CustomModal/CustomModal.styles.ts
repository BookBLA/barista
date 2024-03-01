import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';
import { IProps } from './CustomModal.types';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InnerWrapper = styled.View`
  width: ${({ size }: IProps) => size || '80%'};
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: ${({ close }: IProps) => (close ? '10px 20px 20px 20px' : '28px 20px 20px 20px')};
  align-items: center;
`;

export const TopWrapper = styled.View`
  width: 100%;
  height: 18px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

export const CloseButton = styled.Image`
  width: 18px;
  height: 18px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  font-weight: bold;
  text-align: center;
  color: ${({ color }: IProps) => color || 'fff'};
`;

export const ButtonWrapper = styled.View`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ArrowButton = styled.TouchableOpacity`
  width: 15px;
  height: 11px;
`;

export const RoundButton = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  width: ${({ width }: IProps) => width};
  height: 36px;
  padding: 9px 42px;
  border-radius: 60px;
  font-family: 'fontMedium';
  font-size: 16px;
  background-color: ${({ bgColor }: IProps) => bgColor || colors.primary};
`;
