import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const BookListStyled = styled.TouchableOpacity`
  width: 100%;
  height: 88px;
  border-radius: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  /* padding: 0 13px; */
  margin: 7px 0;
  margin-top: 20px;
`;

export const BookTitleStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  color: black;
`;

export const BookAuthorStyled = styled.Text`
  font-size: 12px;
  font-family: fontRegular;
  margin-top: 6px;
  color: ${colors.textAuthorName};
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
  color: ${colors.textGray5};
`;

export const BookImageStyled = styled.View`
  align-items: center;
  justify-content: center;
  height: 100;
  width: 72;
  margin-right: 14;
`;

export const ImageWrapper = styled.View`
  width: 72px;
  height: 100px;
  border-radius: 6px;
  background-color: #e9e9e9;
`;
