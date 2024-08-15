import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const ErrorWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 85%;
  background-color: ${colors.background};
  border-radius: 20px 20px 0px 0px;
`;

export const BangImage = styled.Image`
  width: 51px;
  height: 51px;
  object-fit: fill;
`;
