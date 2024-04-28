import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  height: 100%;
  background-color: red;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${colors.background};
`;

export const InnerWrapper = styled.View`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const LogoImage = styled.Image`
  width: 150px;
  height: 108px;
  /* width: '70%'; */
  /* height: '50%'; */
  margin-top: 162px;
  margin-bottom: 24px;
`;

export const TitleWrapper = styled.View`
  width: 126px;
  height: 30px;
  margin-bottom: 160px;
  border-radius: 60px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: ${colors.secondary};
`;

export const TitleText = styled.Text`
  margin-top: 160px;
  font-size: 20px;
  font-weight: 500;
  color: ${colors.primary};
`;

export const SubTitleText = styled.Text`
  font-size: 14px;
  font-weight: 200;
  margin-bottom: 195px;
`;

export const SnsText = styled.Text`
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 16px;
`;

export const LoginButton = styled.TouchableOpacity`
  width: 300px;
  height: 45px;
  margin-bottom: 14px;
  margin-top: 18px;
`;
