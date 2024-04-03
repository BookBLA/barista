import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const ColumnStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  /* width: 75%; */
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 76px;
  height: 72px;
  border-radius: 22px;
  display: flex;
  justify-content: center;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
`;

export const TextStyled = styled.Text`
  font-size: 12px;
  font-family: fontMedium;
  text-align: center;
  color: ${(props: IProps) => (props.isSelect ? colors.secondary : colors.textGray2)};
`;
