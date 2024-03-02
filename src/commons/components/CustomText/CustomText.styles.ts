import styled from 'styled-components/native';
import { IProps } from './CustomText.Types';

export const CustomText = styled.Text`
  font-size: ${({ size }: IProps) => size || '16px'};
  color: ${({ color }: IProps) => color || '#000'};
  font-family: ${({ font }: IProps) => font || 'fontMedium'};
  font-weight: ${({ weight }: IProps) => weight || 400};
`;

// export const CustomText = styled.Text<IProps>`
//   font-size: ${({ size }) => size || '14px'};
//   color: ${({ color }) => color || '#000'};
//   font-family: ${({ font }) => font || 'fontMedium'};
//   font-weight: ${({ weight }) => weight || 400};
// `;
