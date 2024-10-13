import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 95%;
  height: 10%;

  padding-top: 14px;
`;

export const Button = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 100%;

  background-color: ${colors.buttonPrimary2};
  border-radius: 50px;
`;

export const RefreshWrapper = styled.View`
  width: 18px;
  height: 18px;
  margin-right: 10px;
`;

export const RefreshImage = styled.Image`
  width: 100%;
  height: 100%;
  object-fit: fill;
`;
