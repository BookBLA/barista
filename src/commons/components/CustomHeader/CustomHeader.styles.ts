import styled from 'styled-components/native';
import { deviceWidth } from '../../utils/dimensions';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 48px;
  background-color: #fff;
  ${({ hasMargin }: { hasMargin: boolean }) => !hasMargin && `padding: 0px 16px;`}
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
  width: 24px;
  height: 24px;
  object-fit: cover;
`;
