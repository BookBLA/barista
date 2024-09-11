import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

interface IProps {
  isSelect: boolean;
}

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 70%;
  margin-bottom: 10px;
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 122px;
  height: 93px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
`;

export const TextStyled = styled.Text`
  /* font-size: 20px; */
  font-size: ${({ isSmall }) => (isSmall ? '14px' : '21px')};
  font-family: fontMedium;
  text-align: center;
  color: ${(props: IProps) => (props.isSelect ? colors.secondary : colors.textGray2)};
`;
