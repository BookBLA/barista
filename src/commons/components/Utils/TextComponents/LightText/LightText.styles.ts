import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';
import { IProps } from './LightText.types';

export const LightText = styled.Text(
  (props: IProps) => `
  font-size: ${props.size || '14px'};
  color: ${props.color || colors.textGray3};
  ${props.weight ? `font-weight: ${props.weight};` : ''}
  margin: ${props.margin || 0};
  font-family: 'fontLight';
`,
);
