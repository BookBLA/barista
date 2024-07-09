import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

export const ProgressBarContainer = styled.View`
  height: 3px;
  width: 90%;
  background-color: ${colors.secondary}; /* Background color */
`;

export const ProgressBarFill = styled.View`
  height: 100%;
  width: ${(props: { progress: number }) => props.progress}%;
  background-color: ${colors.primary}; /* Progress color */
`;
