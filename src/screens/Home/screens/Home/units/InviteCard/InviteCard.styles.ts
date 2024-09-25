import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  width: 100%;
  height: 90%;

  border-radius: 10px;

  overflow: hidden;
`;

export const TopWrapper = styled.View`
  flex: 2;

  background-color: ${colors.inviteCardBackground};
`;

export const TopImage = styled.Image`
  width: 100%;
  height: 100%;

  object-fit: fill;
`;

export const BottomWrapper = styled.View`
  flex: 1;
  padding: 14px 20px 16px;

  background-color: ${colors.buttonNavStroke};
`;

export const ButtonWrapper = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 64px;
  padding: 12px 0;
  margin-bottom: 12px;
  border-radius: 50px;

  background-color: ${colors.buttonMoveSytle};
`;

export const ButtonText = styled.Text`
  font-size: 10px;
  opacity: 0.6;
  color: black;
`;

export const SaveWrapper = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const SaveCodeText = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: black;
`;

export const SaveImageWrapper = styled.View`
  width: 24px;
  height: 24px;
`;

export const SaveImage = styled.Image`
  width: 100%;
  height: 100%;
  margin: 0 10px;

  object-fit: fill;
`;
