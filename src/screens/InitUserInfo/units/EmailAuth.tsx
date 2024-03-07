import { useEffect, useState } from 'react';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import {
  TouchableOpacity,
  View,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  Button,
  Keyboard,
} from 'react-native';
import prevButton from '../../../../assets/images/icons/prevButton.png';
import nextButton from '../../../../assets/images/icons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import notYetNextButton from '../../../../assets/images/icons/NotYetNextButton.png';
import { deviceWidth } from '../../../commons/utils/dimensions';

const EmailAuth = () => {
  const [email, setEamil] = useState('example@gachon.ac.kr');
  const [code, setCode] = useState('000000');
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);

  const [time, setTime] = useState(300); // 5분을 초 단위로 표현

  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (time === 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, time]);

  const startTimer = () => {
    setIsActive(true);
  };
  const resetTimer = () => {
    setTime(300);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
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
      updateUserInfo('schoolEmail', email);
    }
    if (code === '') {
      setCode('000000');
      setIsFocused2(false);
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={100} />
      <S.TouchableStyled onPress={Keyboard.dismiss} underlayColor="transparent">
        <>
          <View>
            <S.ContentStyled>학교 이메일을 입력해 주세요.</S.ContentStyled>
            <S.RowStyled style={{ width: '96%' }}>
              <S.TextFiledStyled
                value={userInfo.schoolEmail === '' ? email : userInfo.schoolEmail}
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
              <S.ButtonStyled
                onPress={startTimer}
                style={{ width: 70, marginBottom: 6, backgroundColor: colors.primary }}
              >
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 18 }}>인증</Text>
              </S.ButtonStyled>
            </S.RowStyled>

            <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
              올바른 이메일 형식을 입력해주세요.
            </Text>
          </View>
          <View>
            <S.ContentStyled>인증 코드를 입력해 주세요.</S.ContentStyled>
            <S.RowStyled style={{ width: deviceWidth * 0.9 }}>
              <S.CodeFiledStyled>
                <S.InputStyled
                  value={code}
                  onChangeText={setCode}
                  onFocus={handleFocus2}
                  onBlur={handleBlur}
                  style={{
                    color: code === '000000' ? colors.textGray2 : colors.primary,
                    width: 100,
                    textAlign: 'start',
                  }}
                />
                <Text style={{ fontSize: 16, fontFamily: 'fontSemiBold', color: colors.errorMessageRed }}>
                  {isActive === false ? '' : formatTime()}
                </Text>
              </S.CodeFiledStyled>
              <S.ButtonStyled style={{ width: 70, marginBottom: 6, backgroundColor: colors.primary }}>
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 18 }}>확인</Text>
              </S.ButtonStyled>
            </S.RowStyled>
            <S.RowStyled style={{ justifyContent: 'flex-end', width: deviceWidth * 0.9 }}>
              <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                인증 코드가 올바르지 않습니다.
              </Text>
              <TouchableOpacity>
                <Text
                  style={{
                    color: colors.textGray,
                    textDecorationLine: 'underline',
                    fontFamily: 'fontMedium',
                    fontSize: 12,
                    textAlign: 'right',
                    marginLeft: 2,
                  }}
                >
                  인증 코드 다시보내기
                </Text>
              </TouchableOpacity>
            </S.RowStyled>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '10%' }}>
            <TouchableOpacity onPress={movePage()}>
              <Image source={prevButton} />
            </TouchableOpacity>
            {/* { ? (
            <Image source={notYetNextButton} />
          ) : (
            <TouchableOpacity onPress={movePage('completePage')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          )} */}
            <TouchableOpacity onPress={movePage('completePage')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          </View>
        </>
      </S.TouchableStyled>
    </S.Wrapper>
  );
};

export default EmailAuth;
