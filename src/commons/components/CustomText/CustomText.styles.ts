import styled from 'styled-components/native';
import { IProps } from './CustomText.Types';

export const Wrapper = styled.View`
  margin: ${({ margin }: IProps) => margin || 0};
`;

export const CustomText = styled.Text`
  font-size: ${({ size }: IProps) => size || '16px'};
  color: ${({ color }: IProps) => color || '#000'};
  font-family: ${({ font }: IProps) => font || 'fontMedium'};
  font-weight: ${({ weight }: IProps) => weight || 400};
`;
