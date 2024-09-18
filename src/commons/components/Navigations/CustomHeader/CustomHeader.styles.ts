import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  /* justify-content: center; */
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0px 16px;
  /* ${({ hasMargin }: { hasMargin: boolean }) => !hasMargin && `padding: 0px 16px;`} */
  ${({ backgroundColor }: { backgroundColor: string }) => backgroundColor && `background-color: ${backgroundColor};`}
`;

export const CenterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${deviceWidth - 80}px;
  ${({ left }: { left: boolean }) => !left && 'margin-left: 24px'}
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 24px;
  height: 100%;
`;

export const IconImage = styled.Image`
  width: 21px;
  height: 20px;
  object-fit: cover;
`;
