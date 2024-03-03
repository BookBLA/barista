import styled from 'styled-components/native';

export const TitleStyled = styled.Text`
  font-size: 50px;
  font-weight: 300;
  text-align: center;
  color: #4a4a4a;
`;

export const StyledFlatList = styled.TouchableHighlight`
  margin: 10px;
  width: 100%;
`;

export const ViewStyled = styled.View`
  display: flex;
  background: #f7f4ed;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 40px;
  height: 48px;
`;

export const PressableStyled = styled.Pressable`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 12px 40px;
  border-radius: 40px;
  margin: 0 16px;
  height: 40px;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
`;

export const PressableTextStyled = styled.Text`
  flex: 1;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
  color: #4a4a4a;
`;
