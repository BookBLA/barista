import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

export const ColumnStyled = styled.View`
  display: flex;
  height: 70%;
  width: 100%;
  flex-direction: column;
  align-items: start;
  justify-content: flex-start;
  background-color: teal;
  padding-left: 20px;
`;

export const RowStyled = styled.View`
  display: flex;

  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 7%;
  background-color: skyblue;
`;
