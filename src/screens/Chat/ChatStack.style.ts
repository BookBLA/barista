import styled from 'styled-components/native';
import { colors } from '@commons/styles/variablesStyles';

export const LoadingWrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Spinner = styled.View`
  width: 70px;
  height: 70px;
  box-sizing: border-box;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-top-color: ${colors.buttonPrimary};
  border-radius: 100px;
  animation: spin 1s ease-in-out infinite;
`;
