import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const HeaderView = styled.View`
  padding: 14px 0;
  background-color: ${colors.buttonPrimary};
  justify-content: center;
  align-items: center;
  border-radius: 20px;
  margin-bottom: 12px;
`;

export const BodyView = styled.View`
  padding: 14px 0;
  margin-bottom: 20px;
`;

export const UserStyleView = styled.View`
  margin-bottom: 20px;
`;

export const UserStyleBoxContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  margin-top: 14px;
`;

export const UserStyleBox = styled.View`
  margin: 5px 10px;
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #fff5d6;
`;

export const PersonalQuizAnswerBox = styled.View`
  width: 100%;
  height: 120px;
  padding: 10px 20px;
  border-radius: 10px;
  background-color: #fff5d6;
`;
