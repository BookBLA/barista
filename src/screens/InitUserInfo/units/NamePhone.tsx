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
  const [name, setName] = useState('');
  const [phNum, setPhNum] = useState(userInfo.phoneNumber);

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
                defaultValue={userInfo.name}
                onChangeText={(text: string) => setName(text)}
                onBlur={() => updateUserInfo('name', name)}
                placeholder="이름"
                placeholderTextColor={colors.textGray2}
              />
            </View>

            <View style={{ width: '100%', alignItems: 'center' }}>
              <S.ContentStyled>전화번호를 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                value={phNum}
                onChangeText={handlePhoneNumberChange}
                onBlur={() => updateUserInfo('phoneNumber', phNum)}
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
    </S.Wrapper>
  );
};

export default NamePhone;
