import { colors } from '@commons/styles/variablesStyles';
import { BlurView } from '@react-native-community/blur';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  position: absolute;
  top: 48;
  left: 0;
  right: 0;
  bottom: 0;

  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-color: rgba(0, 0, 0, 0.8);
  padding: 0 16px;

  z-index: 1000;
`;

export const BlurWrapper = styled(BlurView)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
`;

export const InnerWrapper = styled.View`
  flex: 0.5;
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 100%;
  height: 100%;
  padding: 26px 16px 16px;
  border-radius: 10px;

  background-color: white;
`;

export const ImageWrapper = styled.View`
  width: 63px;
  height: 77px;

  margin-bottom: 30px;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;

  object-fit: fill;
`;

export const ButtonWrapper = styled.TouchableOpacity`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 44px;
  border-radius: 5px;

  background-color: ${colors.primary};
  margin-top: auto;
`;
