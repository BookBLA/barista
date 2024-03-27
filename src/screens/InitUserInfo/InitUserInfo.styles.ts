import styled from 'styled-components/native';
import { colors } from '../../commons/styles/variablesStyles';

interface IProps {
  isSelect: boolean;
}

export const Wrapper = styled.View`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: space-between;
`;

export const SafeAreaViewStyled = styled.SafeAreaView`
  height: 9%;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  justify-content: center;
  /* background-color: skyblue; */
`;
export const ColumnStyled = styled.View`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  /* background-color: mistyrose; */
`;
export const TouchableStyled = styled.TouchableHighlight`
  height: 80%;
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const TitleStyled = styled.Text`
  font-size: 16px;
  color: black;
  font-family: fontMedium;
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

export const ButtonStyled = styled.TouchableOpacity<{ borderRadius?: number }>`
  width: 80%;
  height: 40px;
  border-radius: ${({ borderRadius }: { borderRadius?: number }) => (borderRadius ? `${borderRadius}px` : '60px')};
  background-color: ${colors.buttonMain};
  align-items: center;
  justify-content: center;
  /* margin-bottom: 20px; */
`;
export const CodeFiledStyled = styled.View`
  width: 80%;
  height: 40px;
  border-radius: 60px;
  background-color: ${colors.buttonMain};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 11px;
`;

export const NextButtonStyled = styled.TouchableOpacity`
  width: 95%;
  height: 6%;
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

export const InputStyled = styled.TextInput`
  /* width: 80%; */
  /* height: 40px; */
  /* border-radius: 60px; */
  //padding: 0 20px;
  font-size: 16px;
  font-family: fontMedium;
  /* background-color: ${colors.buttonMain}; */
  //align-items: center;
  justify-content: center;
  //margin-bottom: 20px;
  text-align: center;
`;

export const TextStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  text-align: center;
  color: ${colors.textGray2};
`;

export const OpenChatTitleStyled = styled.Text`
  font-size: 20px;
  font-family: fontSemiBold;
  text-align: center;
  color: 'black';
  margin-bottom: 16px;
  margin-top: 50px;
`;

export const OpenChatContentStyled = styled.Text`
  font-size: 16px;
  font-family: fontMedium;
  text-align: center;
  color: ${colors.primary};
`;

export const DividerLine = styled.View`
  width: 100%;
  border: 1px solid ${colors.textGray1};
  margin-top: 24px;
  margin-bottom: 24px;
`;

export const RoundRectStyled = styled.View`
  width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 10px;
  background-color: ${colors.buttonMain};
  justify-content: 'center';
  align-items: 'center';
  flex-direction: 'column';
`;
