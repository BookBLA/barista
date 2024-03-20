import styled from 'styled-components/native';
import { deviceWidth } from '../../utils/dimensions';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 48px;
`;

export const CenterWrapper = styled.View`
  width: ${deviceWidth - 80}px;
  margin-left: ${({ left }: { left: boolean }) => (!left ? 24 : 0)}px;
  background-color: red;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;

export const Button = styled.TouchableOpacity`
  width: 24px;
  height: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: blue;
`;

export const IconImage = styled.Image`
  width: 24px;
  height: 24px;
`;
