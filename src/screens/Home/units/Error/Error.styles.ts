import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';

export const ErrorWrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 77%;
  background-color: ${colors.background};
`;

export const BangImage = styled.Image`
  width: 51px;
  height: 51px;
  object-fit: contain;
`;
