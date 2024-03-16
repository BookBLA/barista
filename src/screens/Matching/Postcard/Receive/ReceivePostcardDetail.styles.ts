import styled from 'styled-components/native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { StyleSheet } from 'react-native';

export const HeaderView = styled.View`
  flex-direction: row;
  width: 100%;
  color: white;
`;

export const HeaderImage = styled.Image`
  width: 24px;
  height: 24px;
`;

export const HeaderTextWrapper = styled.View`
  flex: 1;
  margin-right: 14px;
  align-items: center;
  justify-content: center;
  text-align: center;
`;

export const HeaderText = styled.Text`
  font-weight: bold;
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

export const ButtonContainerViewStyled = styled.View`
  flex-direction: row;
`;

export const ButtonText = styled.Text`
  color: ${(props: any) => props.fontColor ?? 'white'};
  text-align: center;
  font-size: 14px;
`;

export const ButtonContainer = styled.View`
  flex: 1;
  padding: 10px;
  border-radius: 10px;
  margin-right: ${(props: any) => (props.left ? '4px' : 0)};
  margin-left: ${(props: any) => (props.right ? '4px' : 0)};
  background-color: ${(props: any) => props.backgroundColor ?? 'black'};
`;

export const styles = StyleSheet.create({
  image: {
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    width: '100%',
    height: '80%',
  },
});
