import { useState } from 'react';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView, Keyboard } from 'react-native';
import prevButton from '../../../../assets/images/icons/prevButton.png';
import nextButton from '../../../../assets/images/icons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import notYetNextButton from '../../../../assets/images/icons/NotYetNextButton.png';

const NamePhone = () => {
  const [name, setName] = useState('이름');
  const [phNum, setPhNum] = useState('010-1234-5678');
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();

  const handleFocus = () => {
    if (!isFocused1) {
      setPhNum(''); // Clear the phNum when the TextInput is focused for the first time
      setIsFocused1(true);
    }
    // if (!isFocused2) {
    //   setName(''); // Clear the phNum when the TextInput is focused for the first time
    //   setIsFocused2(true);
    // }
  };
  const handleFocus2 = () => {
    if (!isFocused2) {
      setName(''); // Clear the phNum when the TextInput is focused for the first time
      setIsFocused2(true);
    }
  };

  const handleBlur = () => {
    if (phNum === '') {
      setPhNum('010-1234-5678'); // Restore the initial phNum if the TextInput is left empty
      setIsFocused1(false);
    }
    updateUserInfo('phoneNumber', phNum);
  };
  const handleBlur2 = () => {
    if (name === '') {
      setName('이름');
      setIsFocused2(false);
    }
    updateUserInfo('name', name);
  };
  const handlePhoneNumberChange = (phNum: string) => {
    // 정규식을 사용하여 숫자만 필터링합니다.
    const formattedPhoneNumber = phNum.replace(/[^0-9]/g, '');

    // 하이픈을 추가해주는 로직
    let formattedWithHyphen = '';
    if (formattedPhoneNumber.length >= 3) {
      formattedWithHyphen += formattedPhoneNumber.substr(0, 3) + '-';
      if (formattedPhoneNumber.length >= 7) {
        formattedWithHyphen += formattedPhoneNumber.substr(3, 4) + '-';
        if (formattedPhoneNumber.length > 7) {
          formattedWithHyphen += formattedPhoneNumber.substr(7);
        }
      } else {
        formattedWithHyphen += formattedPhoneNumber.substr(3);
      }
    } else {
      formattedWithHyphen = formattedPhoneNumber;
    }
    setPhNum(formattedWithHyphen);
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />

      <S.TouchableStyled onPress={Keyboard.dismiss} underlayColor="transparent">
        <>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>이름을 입력해 주세요.</S.ContentStyled>
            <S.TextFiledStyled
              value={userInfo.name === '' ? name : userInfo.name}
              onChangeText={setName}
              onFocus={handleFocus2}
              onBlur={handleBlur2}
              style={{
                color: userInfo.name === '' ? colors.textGray2 : colors.primary,
              }}
            />
          </View>
          <KeyboardAvoidingView
            style={{ width: '100%' }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -500}
          >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <S.ContentStyled>전화번호를 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                value={userInfo.phoneNumber === '' ? phNum : userInfo.phoneNumber}
                onChangeText={handlePhoneNumberChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                keyboardType="numeric" // 숫자 키패드만 허용
                maxLength={13} // 최대 길이 제한 (하이픈 포함)
                style={{
                  color: userInfo.phoneNumber === '' ? colors.textGray2 : colors.primary,
                }}
              />
            </View>
          </KeyboardAvoidingView>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '10%' }}>
            <TouchableOpacity onPress={movePage()}>
              <Image source={prevButton} />
            </TouchableOpacity>
            {/* {userInfo.name === '' || userInfo.phoneNumber === '' ? (
            <Image source={notYetNextButton} />
          ) : (
            <TouchableOpacity onPress={movePage('schoolStudentID')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          )} */}
            <TouchableOpacity onPress={movePage('schoolStudentID')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          </View>
        </>
      </S.TouchableStyled>
    </S.Wrapper>
  );
};

export default NamePhone;
