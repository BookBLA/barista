import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';

export const ContainerViewStyled = styled.View`
  color: white;
  height: 100%;
`;

export const UserInfoViewStyled = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const UserInfoNameWrapper = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const GenderIconStyled = styled.Image`
  width: 20px;
  height: 20px;
`;

export const PostcardTextViewStyled = styled.Text`
  color: ${colors.textBlack};
  margin-bottom: 4px;
`;

export const CircularImage = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  border-width: 1px;
  border-color: black;
  margin-right: 4px;
`;

export const dashLineViewStyled = styled.View`
  margin: 8px 0;
  border: 1px dashed #d2d6e2;
`;
