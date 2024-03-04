import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';
import { deviceWidth } from '../../utils/dimensions';

interface IProps {
  isSelect: boolean;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  /* justify-content: space-between; */
`;

export const SafeAreaViewStyled = styled.SafeAreaView`
  height: 10%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-self: center;
  justify-content: center;
`;
export const ColumnStyled = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;

export const TitleStyled = styled.Text`
  font-size: 16px;
  color: black;
  font-family: fontMedium;
  //font-weight: bold;
`;

export const ContentStyled = styled.Text`
  text-align: center;
  font-size: 22px;
  font-family: fontMedium;
  color: black;
  margin-bottom: 16px;
`;

export const RowStyled = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  /* width: deviceWidth * 0.9; */
  width: 65%;
`;

export const BooleanButtonStyled = styled.TouchableOpacity`
  width: 103px;
  height: 72px;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

export const ButtonTextStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  text-align: center;
  color: ${(props: IProps) => (props.isSelect ? colors.secondary : colors.textGray2)};
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  /* border-radius: 60px; */
  border-radius: ${({ borderRadius }) => (borderRadius ? `${borderRadius}px` : '60px')};
  background-color: ${colors.buttonMain};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;
export const NextButtonStyled = styled.TouchableOpacity`
  width: 95%;
  height: 60px;
  border-radius: 60px;
  background-color: ${colors.primary};
  align-items: center;
  justify-content: center;
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
  //margin-bottom: 20px;
  text-align: center;
`;
