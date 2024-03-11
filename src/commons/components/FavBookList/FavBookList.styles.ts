import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

export const BookListStyled = styled.View`
  width: 86%;
  height: 88px;
  background-color: ${colors.buttonMain};
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 13px;
  margin: 7px 0;
`;

export const BookTitleStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  color: black;
`;

export const BookAuthorStyled = styled.Text`
  font-size: 12px;
  font-family: fontMedium;
  color: ${colors.textGray};
`;

export const ColumnStyled = styled.View`
  display: flex;
  height: 62px;
  width: 75%;
  flex-direction: column;
  align-items: flex-start;
  /* justify-content: ; */
`;

export const DeleteTextStyled = styled.Text`
  /* text-align: right; */
  font-size: 10px;
  font-family: fontMedium;
  color: '#2A2A2A';
`;
