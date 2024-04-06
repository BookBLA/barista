import styled from 'styled-components/native';
import { colors } from '../../../../../../commons/styles/variablesStyles';

export const Wrapper = styled.View`
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

export const TopWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-bottom: 32px;
  padding-bottom: 24px;
  border-bottom-width: 1px;
  border-bottom-color: ${colors.textGray};
`;

export const Line = styled.View`
  border: 1px solid red;
`;

export const SelectWrapper = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 32px;
  padding-right: 9px;
`;

export const CheckImage = styled.Image`
  width: 19px;
  height: 12px;
`;
