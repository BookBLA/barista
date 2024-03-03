import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { StyleSheet } from 'react-native';

export const ContainerViewStyled = styled.View`
  width: 100%;
  height: 244px;
  color: white;
`;

export const PostcardInfoViewStyled = styled.View`
  background: #1d2e61;
  height: 20%;
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
  padding: 4px 8px;
`;

export const PostcardTextViewStyled = styled.Text`
  color: ${colors.textYellow};
`;

export const PostcardInfoFirstViewStyled = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 4px;
`;

export const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: '80%',
  },
});
