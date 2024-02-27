import { useState } from 'react';
import ProgressBar from '../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from './InitUserInfo.styles';
import { TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import prevButton from '../../../assets/images/icons/prev_button.png';
import nextButton from '../../../assets/images/icons/next_button.png';

const NamePhone = ({ navigation }: { navigation: any }) => {
  const [name, setName] = useState('이름');
  const [text, setText] = useState('010-1234-5678');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const handleFocus = () => {
    if (!isFocused1) {
      setText(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused1(true);
    }
    // if (!isFocused2) {
    //   setName(''); // Clear the text when the TextInput is focused for the first time
    //   setIsFocused2(true);
    // }
  };
  const handleFocus2 = () => {
    if (!isFocused2) {
      setName(''); // Clear the text when the TextInput is focused for the first time
      setIsFocused2(true);
    }
  };

  const handleBlur = () => {
    if (text === '') {
      setText('010-1234-5678'); // Restore the initial text if the TextInput is left empty
      setIsFocused1(false);
    }
    if (name === '') {
      setName('이름');
      setIsFocused2(false);
    }
  };
  const handlePrevious = () => {
    navigation.navigate('genderBirth');
  };

  const handleNext = () => {
    navigation.navigate();
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={50} />
      {/* <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
      > */}
      {/* <ScrollView
        //contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled" // Ensure taps outside text fields dismiss keyboard
      > */}
      <S.ContentStyled style={{ marginTop: 90, marginBottom: 16 }}>이름을 입력해 주세요.</S.ContentStyled>
      <S.TextFiledStyled
        value={name}
        onChangeText={setName}
        onFocus={handleFocus2}
        onBlur={handleBlur}
        style={{
          color: name === '이름' ? colors.textGray2 : colors.primary,
        }}
      />
      <S.ContentStyled style={{ marginTop: 151, marginBottom: 16 }}>전화번호를 입력해 주세요.</S.ContentStyled>
      <S.TextFiledStyled
        value={text}
        onChangeText={setText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={{
          color: text === '010-1234-5678' ? colors.textGray2 : colors.primary,
        }}
      />
      {/* </ScrollView> */}
      {/* </KeyboardAvoidingView> */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
        <TouchableOpacity onPress={handlePrevious}>
          <Image source={prevButton} style={{ width: 11, height: 15 }} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleNext}>
          <Image source={nextButton} style={{ width: 11, height: 15 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};

export default NamePhone;
