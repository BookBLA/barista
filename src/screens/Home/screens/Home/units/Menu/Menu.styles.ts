import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const MenuWrapper = styled.View`
  display: flex;
  flex-direction: column;
  padding: 20px 0px 0px 20px;
  height: 15%;
`;

export const FilterWrapper = styled.ScrollView`
  display: flex;
  flex-direction: row;
`;

export const FilterBox = styled.TouchableOpacity`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-radius: 30px;
  margin-right: 6px;
  padding: 4px 10px;
  height: 30px;
  background-color: ${({ isSelect }: { isSelect: boolean }) => (isSelect ? colors.buttonMain : '#D6EFFB')};
`;
//
export const FilterImage = styled.Image`
  width: 14px;
  height: 14px;
  object-fit: contain;
  margin: 0 3px;
`;
