import styled from 'styled-components/native';
import { colors } from '../../../styles/variablesStyles';

export const PageIndexRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  width: 100%;
  margin-top: 20px;
  margin-bottom: 70px;
  padding: 0 16px;
`;

export const SideWrapper = styled.View`
  display: flex;
  flex-direction: row;
`;

export const MovePageImageStyled = styled.Image`
  width: 30px;
  height: 20px;
`;

export const PageIndexTextStyled = styled.Text`
  font-size: 12px;
  font-family: ${(props: { selected: boolean }) => (props.selected ? 'fontBold' : 'fontMedium')};
  margin: 0 10px;
  color: ${(props: { selected: boolean }) => (props.selected ? 'black' : colors.textGray1)};
`;
