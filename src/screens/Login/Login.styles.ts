import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
  /* padding: 250px;  */
`;

export const InnerWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 159px;
  height: 159px;
`;

export const TitleWrapper = styled.View`
  width: 126px;
  height: 30px;
  border-radius: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
`;

export const TitleText = styled.Text`
  font-size: 20px;
  font-weight: 500;
  color: ${colors.primary};
`;

export const SubTitleText = styled.Text`
  font-size: 14px;
  font-weight: 200;
`;

export const SnsText = styled.Text`
  font-size: 14px;
  font-weight: 700;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 300px;
  height: 45px;
`;
