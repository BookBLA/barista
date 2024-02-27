import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  //justify-content: center;
`;

export const SafeAreaViewStyled = styled.SafeAreaView`
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
`;

export const TitleStyled = styled.Text`
  font-size: 16px;
  color: black;
  font-family: fontMedium;
  //font-weight: bold;
`;

export const ContentStyled = styled.Text`
  font-size: 22px;
  font-family: fontMedium;
  color: black;
`;

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-evenly;
  margin: 0 5px;
  flex-direction: row;
  width: 80%;
`;

export const BooleanButtonStyled = styled.TouchableOpacity`
  width: 103px;
  height: 72px;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const BooleanTextStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  color: ${(props: IProps) => (props.isSelect ? colors.secondary : colors.textGray2)};
`;

export const DateButtonStyled = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  border-radius: 60px;
  background-color: ${colors.buttonMain};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextFiledStyled = styled.TextInput`
  width: 80%;
  height: 40px;
  border-radius: 60px;
  //padding: 0 20px;
  font-size: 16px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  //align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  text-align: center;
`;
