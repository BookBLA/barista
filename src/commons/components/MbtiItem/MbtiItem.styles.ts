import styled from 'styled-components/native';
import { colors } from '../../styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 80%;
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border: 1px solid rgba(0, 0, 0, 0.2);
  display: flex;
  justify-content: center;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : 'white')};
`;

export const TextStyled = styled.Text`
  font-size: 50px;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
`;
