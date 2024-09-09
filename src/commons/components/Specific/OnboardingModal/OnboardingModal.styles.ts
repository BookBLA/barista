import styled from 'styled-components/native';
import { colors } from '@commons/styles/variablesStyles';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`;

export const ImageSection = styled.View`
  flex: 11;
  background-color: ${colors.onboardingBackground};
  align-items: center;
  justify-content: center;
`;

export const TextSection = styled.View`
  flex: 6.5;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 10px 0;
  font-size: 20px;
  color: black;
  font-weight: 500;
  text-align: center;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.textSub};
  text-align: center;
`;

export const Footer = styled.View`
  flex: 2.5;
  margin-top: auto;
  padding: 0 20px 10px 20px;
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  background-color: white;
`;

export const LeftButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
  background-color: transparent;
`;

export const PageIndex = styled.Image`
  flex: 2;
  align-items: center;
  justify-content: center;
  height: 8px;
  background-color: transparent;
`;

export const RightButton = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px 16px;
  border-radius: 4px;
  font-size: 14px;
`;

export const ExitButton = styled.TouchableHighlight`
  flex: 2;
  border-top-width: 1px;
  border-color: #0000001a;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: white;
`;
