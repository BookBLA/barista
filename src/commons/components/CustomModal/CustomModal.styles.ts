import styled from 'styled-components/native';
import { IStyledProps } from './CustomModal.types';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InnerWrapper = styled.View`
  width: ${({ size }: IStyledProps) => size || '80%'};
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: ${({ close }: IStyledProps) => (close ? '10px 20px 20px 20px' : '28px 20px 20px 20px')};
  align-items: center;
`;