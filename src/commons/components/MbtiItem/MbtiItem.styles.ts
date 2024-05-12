import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 75%;
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
