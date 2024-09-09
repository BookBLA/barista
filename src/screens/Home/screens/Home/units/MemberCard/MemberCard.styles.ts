import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  width: 100%;
  height: 90%;

  background-color: ${colors.cardBackground};
  border-radius: 10px;
`;

export const SendButton = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 44px;
  border-radius: 0 0 10px 10px;
  background-color: ${colors.primary02};
`;
