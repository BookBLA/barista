import styled from 'styled-components/native';
import { IProps } from './CustomText.types';

export const Wrapper = styled.TouchableOpacity(
  (props: IProps) => `
  margin: ${props.margin || 0};
`,
);

export const CustomText = styled.Text(
  (props: IProps) => `
  font-size: ${props.size || '16px'};
  color: ${props.color || '#000'};
  font-family: ${props.font || 'fontMedium'};
  ${props.weight ? `font-weight: ${props.weight};` : ''}
  margin: ${props.margin || 0};
`,
);
