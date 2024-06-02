import { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, Keyboard, TouchableWithoutFeedback } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const NamePhone = () => {
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [name, setName] = useState(userInfo.name);
  const [phNum, setPhNum] = useState(userInfo.phoneNumber);

  const isHangul = (text: string) => {
    const hangulRegex = /^[\u3131-\u318E\uAC00-\uD7A3]+$/;
    return hangulRegex.test(text);
  };

  const handleChangeName = (input: string) => {
    if (isHangul(input) || input === '') {
      setName(input);
    }
  };

  const handlePhoneNumberChange = (phNum: string) => {
    const onlyNums = phNum.replace(/[^0-9]/g, '');
    let formattedNumber = '';
    if (onlyNums.length <= 3) {
      formattedNumber = onlyNums;
    } else if (onlyNums.length <= 7) {
      formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    } else {
      formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
    }
    setPhNum(formattedNumber);
  };

  const nextPage = () => {
    updateUserInfo({ name: name, phoneNumber: phNum });
    movePage('schoolStudentID')();
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              height: '80%',
              justifyContent: 'space-around',
            }}
          >
            <View style={{ width: '100%', alignItems: 'center' }}>
              <S.ContentStyled>이름을 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                maxLength={10} // 최대 길이 제한
                defaultValue={userInfo.name}
                onChangeText={(text: string) => handleChangeName(text)}
                // onBlur={() => updateUserInfo('name', name)}
                placeholder="이름"
                placeholderTextColor={colors.textGray2}
                value={name}
              />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
              <S.ContentStyled>전화번호를 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                value={phNum}
                onChangeText={handlePhoneNumberChange}
                // onBlur={() => updateUserInfo('phoneNumber', phNum)}
                keyboardType="numeric" // 숫자 키패드만 허용
                maxLength={13} // 최대 길이 제한 (하이픈 포함)
                placeholder="010-1234-5678"
                placeholderTextColor={colors.textGray2}
              />
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </S.ColumnStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '10%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} />
        </TouchableOpacity>
        {name.length < 2 || phNum.length !== 13 ? (
          <Image source={notYetNextButton} />
        ) : (
          <TouchableOpacity onPress={nextPage}>
            <Image source={nextButton} />
          </TouchableOpacity>
        )}
      </View>
    </S.Wrapper>
  );
};

export default NamePhone;
