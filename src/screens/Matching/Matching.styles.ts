import styled from 'styled-components/native';
import { FlatList } from 'react-native';

export const TitleStyled = styled.Text`
  font-size: 50px;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
`;

export const StyledFlatList = styled(FlatList)`
  margin: 10px;
  width: 100%;
`;
