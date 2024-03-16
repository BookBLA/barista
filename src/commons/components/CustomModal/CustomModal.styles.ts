import styled from 'styled-components/native';
import { IStyledProps } from './CustomModal.types';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export const InnerWrapper = styled.View`
  display: flex;
  margin: 0 16px;
  flex-direction: column;
  background-color: #fff;
  border-radius: 10px;
  padding: ${({ close }: IStyledProps) => (close ? '20px 20px' : '28px 20px 20px')};
  align-items: center;
`;
