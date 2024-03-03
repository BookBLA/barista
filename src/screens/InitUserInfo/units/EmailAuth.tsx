import { useState } from 'react';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import prevButton from '../../../../assets/images/icons/prev_button.png';
import nextButton from '../../../../assets/images/icons/next_button.png';
import useMovePage from '../../../commons/hooks/useMovePage';

const EmailAuth = () => {
  const [email, setEamil] = useState('example@gachon.ac.kr');
  const [code, setCode] = useState('000000');
  const { movePage } = useMovePage();
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus = () => {
    if (!isFocused1) {
      setEamil(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused1(true);
    }
  };
  const handleFocus2 = () => {
    if (!isFocused2) {
      setCode(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused2(true);
    }
  };
  const handleBlur = () => {
    if (email === '') {
      setEamil('example@gachon.ac.kr'); // Restore the initial text if the TextInput is left empty
      setIsFocused1(false);
    }
    if (code === '') {
      setCode('000000');
      setIsFocused2(false);
    }
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={100} />
      <S.ContentStyled style={{ marginTop: 117, marginBottom: 16 }}>학교 이메일을 입력해 주세요.</S.ContentStyled>
      <S.RowStyled>
        <S.TextFiledStyled
          value={email}
          onChangeText={setEamil}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            color: email === 'example@gachon.ac.kr' ? colors.textGray2 : colors.primary,
            width: 270,
            textAlign: 'start',
            paddingLeft: 20,
          }}
        />
        <S.ButtonStyled style={{ width: 70, marginBottom: 20, backgroundColor: colors.primary }}>
          <Text
            //   onPress={}
            style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 18 }}
          >
            인증
          </Text>
        </S.ButtonStyled>
      </S.RowStyled>

      <Text style={{ color: colors.primary, fontFamily: 'fontMedium', fontSize: 14, textAlign: 'right' }}>
        올바른 이메일 형식을 입력해주세요.
      </Text>
      <S.ContentStyled style={{ marginTop: 126, marginBottom: 16 }}>인증 코드를 입력해 주세요.</S.ContentStyled>
      <S.RowStyled>
        <S.TextFiledStyled
          value={code}
          onChangeText={setCode}
          onFocus={handleFocus2}
          onBlur={handleBlur}
          style={{
            color: code === '000000' ? colors.textGray2 : colors.primary,
            width: 270,
            textAlign: 'start',
            paddingLeft: 20,
          }}
        />
        <S.ButtonStyled style={{ width: 70, marginBottom: 20, backgroundColor: colors.primary }}>
          <Text
            //   onPress={}
            style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 18 }}
          >
            확인
          </Text>
        </S.ButtonStyled>
      </S.RowStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} style={{ width: 11 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={movePage('completePage')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};

export default EmailAuth;
