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
  flex: 1;
  background-color: ${colors.onboardingBackground};
  align-items: center;
  justify-content: center;
`;

export const TextSection = styled.View`
  flex: 1;
  background-color: violet;
  align-items: center;
  justify-content: center;
`;

export const Title = styled.Text`
  margin: 10px 0;
  font-size: 20px;
  line-height: 1.4;
  color: black;
  font-weight: normal;
`;

export const Description = styled.Text`
  font-size: 14px;
  color: ${colors.textSub};
`;

export const Footer = styled.View`
  margin-top: auto;
`;

export const LeftButton = styled.TouchableOpacity`

`;

export const RightButton = styled.TouchableOpacity`

`;
