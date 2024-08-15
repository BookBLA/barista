import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

interface IProps {
  isSelect: boolean;
}

export const InnerWrapper = styled.TouchableHighlight`
  height: 80%;
  /* margin-top: 10; */
  /* margin-bottom: 10; */
  width: 100%;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 105px;
  height: 44px;
  border-radius: 14px;
  display: flex;
  justify-content: center;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
`;

export const LongButtonStyled = styled.TouchableOpacity`
  width: 80%;
  height: 40px;
  /* border-radius: 60px; */
  border-radius: 60px;
  background-color: ${(props: IProps) => (props.isSelect ? colors.primary : colors.buttonMain)};
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const TextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 80, // 최대 글자 수
})`
  width: 85%;
  height: 32%;
  border-radius: 6px;
  font-size: 14px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  justify-content: flex-start;
  text-align: left;
  padding: 12px 12px 12px 12px;
`;
export const OpenChatTextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 1000, // 최대 글자 수
})`
  width: 85%;
  height: 35%;
  border-radius: 6px;
  font-size: 14px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  /* justify-content: flex-start; */
  /* text-align: left; */
  padding: 12px 12px 12px 12px;
`;

export const MoveButtonStyled = styled.TouchableOpacity`
  width: 22%;
  height: 60px;
  border-radius: 20px;
  background-color: ${colors.buttonMoveSytle};
  align-items: center;
  justify-content: center;
`;
