import { colors } from '@commons/styles/variablesStyles';
import styled from 'styled-components/native';

export const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  padding-top: 25px;
  align-items: center;
`;

export const ButtonStyled = styled.TouchableOpacity`
  width: 86%;
  height: 88px;
  border-radius: 10px;
  background-color: ${colors.buttonAddBook};
  align-items: center;
  justify-content: center;
  margin: 7px 0;
`;
export const RowStyled = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 86%;
  margin-bottom: 10px;
`;

export const TextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 100, // 최대 글자 수
})`
  width: 88%;
  height: 93px;
  padding: 5px;
  border-radius: 10px;
  font-size: 14px;
  font-family: 'fontMedium';
  justify-content: center;
  background-color: ${colors.buttonMain};
  text-align: start;
  padding: 12px;
  padding-top: 12px;
  flex-shrink: 1;
`;

export const QuizTextFiledStyled = styled.TextInput.attrs({
  multiline: true, // 여러 줄 입력 가능
  maxLength: 21, // 최대 글자 수
})`
  width: 86%;
  height: 38px;
  border-radius: 60px;
  padding: 12px;
  font-size: 12px;
  font-family: fontMedium;
  background-color: ${colors.buttonMain};
  align-items: center;
  justify-content: center;
  margin: 7px 0;
  text-align: start;
  padding-left: 16px;
`;

export const QuizStyled = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 86%;
  height: 38px;
  border-radius: 60px;
  background-color: ${colors.buttonMain};
  padding-left: 16px;
  margin-bottom: 26px;
`;

export const QuizTextInput = styled.TextInput.attrs({
  maxLength: 31,
})`
  width: 90%;
  height: 38px;
  font-size: 12px;
  font-family: 'fontMedium';
  padding: 5px;
`;

export const SearchContainer = styled.View`
  width: 93%;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: 44px;
  border-radius: 30px;
  border: 1px solid ${colors.textGray1};
  padding-left: 16px;
  padding-right: 15px;

  margin-bottom: 10px;
`;

export const SearchBarStyled = styled.TextInput`
  width: 85%;
  height: 44px;
  font-size: 14px;
  font-family: 'fontMedium';
`;

export const ColumnStyled = styled.View`
  /* display: flex; */
  flex: 1;
  width: 93%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  /* background-color: pink; */
`;

export const searchResultTextArea = styled.View`
  flex-direction: row;
`;

export const TextButtonStyled = styled.TouchableOpacity`
  width: auto;
  /* height: 38px; */
`;

export const PageIndexRow = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 30px;
  width: auto;
  margin-top: 20px;
  margin-bottom: 70px;
`;

export const MovePageImageStyled = styled.Image`
  width: 30px;
  height: 20px;
`;

export const PageIndexTextStyled = styled.Text`
  font-size: 12px;
  font-family: ${(props: { selected: boolean }) => (props.selected ? 'fontBold' : 'fontMedium')};
  margin: 0 10px;
  color: ${(props: { selected: boolean }) => (props.selected ? 'black' : colors.textGray1)};
`;

export const CenterWrapper = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
`;
