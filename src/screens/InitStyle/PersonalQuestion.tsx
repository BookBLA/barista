import { colors } from '../../commons/styles/variablesStyles';
import { Text } from 'react-native';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import * as T from './InitStyle.styles';
import ProgressBar from '../../commons/components/ProgressBar/ProgressBar';
import { useState } from 'react';

const PersonalQuestion = ({ navigation }: { navigation: any }) => {
  const [question, setQuestion] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    if (!isFocused) {
      setQuestion(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused(true);
    }
  };

  const handleBlur = () => {
    if (question === '') {
      setQuestion('');
      setIsFocused(false);
    }
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={100} />

      <S.ContentStyled style={{ marginTop: 30, marginBottom: 10 }}>상대방에게 궁금한 점을 적어주세요</S.ContentStyled>
      <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
        ex) 주로 어디서 책을 읽나요?
      </Text>
      <T.TextFiledStyled
        value={question}
        onChangeText={setQuestion}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          color: question === '' ? colors.textGray2 : colors.primary,
        }}
      />
      <S.NextButtonStyled onPress={() => navigation.navigate('')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default PersonalQuestion;
