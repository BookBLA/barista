import styled from 'styled-components/native';
import { colors } from '../../../styles/variablesStyles';
import { deviceHeight, deviceWidth } from '../../../utils/ui/dimensions/dimensions';

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
  margin-top: 2px;
  color: ${colors.textGray};
`;

export const ColumnStyled = styled.View`
  display: flex;
  flex: 1;
  height: 62px;
  width: 65%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

export const DeleteTextStyled = styled.Text`
  /* text-align: right; */
  font-size: 10px;
  font-family: fontMedium;
  color: ${colors.textGray5};
`;

export const BookMarkIconImage = styled.Image`
  width: 15px;
  height: 30px;
  position: absolute;
  right: ${deviceWidth / 10}px;
  top: ${deviceHeight / 500 - 5}px;
`;

export const ImageWrapper = styled.View`
  width: 62px;
  height: 62px;
  margin-right: 3%;
  border-radius: 10px;
  background-color: #e9e9e9;
`;
