import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const ColumnStyled = styled.View`
  display: flex;
  height: 70%;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  padding-left: 20px;
`;

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  width: 95%;
  height: 7%;
  margin-top: 6px;
  background-color: skyblue;
`;

export const DividerStyled = styled.View`
  width: 95%;
  height: 1px;
  background-color: ${colors.buttonReauth};
  margin-top: 16px;
  margin-bottom: 14px;
`;
