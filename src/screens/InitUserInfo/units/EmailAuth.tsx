import { useEffect, useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text, Keyboard, TouchableWithoutFeedback } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import { deviceWidth } from '../../../commons/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { postAuthEmailApi, postAuthVerifyApi, putAuthEmailApi } from '../../../commons/api/memberAuth';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import useMemberStore from '../../../commons/store/useMemberStore';

const EmailAuth = () => {
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState('false'); //false: 이메일 전송 전, true: 인증 완료, done: 이메일 전송 완료, error: 인증 코드 오류
  // const [isSuccess, setIsSuccess] = useState('true');

  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage, handleReset } = useMovePage();
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
    callPostAuthEmailApi();
  };
  const resetTimer = () => {
    setTime(300);
  };

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };
  // const handleFocus = () => {
  //   if (!isFocused1) {
  //     setEamil(''); // Clear the text when the TextInput is focused for the first time
  //     setIsFocused1(true);
  //   }
  // };
  // const handleFocus2 = () => {
  //   if (!isFocused2) {
  //     setCode(''); // Clear the text when the TextInput is focused for the first time
  //     setIsFocused2(true);
  //   }
  // };
  const handleBlur = () => {
    // if (email === '') {
    //   setEamil('example@gachon.ac.kr'); // Restore the initial text if the TextInput is left empty
    //   setIsFocused1(false);
    // }
    // if (code === '') {
    //   setCode('');
    //   // setIsFocused2(false);
    // }
    // updateUserInfo('schoolEmail', email);
  };
  useEffect(() => {
    console.log('email', email);
  }, [email]);

  // const memberId = useMemberStore((state) => state.memberInfo.id);

  const callPostAuthEmailApi = async () => {
    try {
      const response = await postAuthEmailApi({
        // schoolEmail: userInfo.schoolEmail,
        schoolEmail: email,
      });
      //타이머 시작
      resetTimer();
      setIsActive(true);

      updateUserInfo({ schoolEmail: email });
      setIsSuccess('done'); // 이메일 전송 성공
      console.log('callPostEmailAuthApi', response);
    } catch (error) {
      console.log('callPostAuthApi error', error);
    }
  };
  const callPostAuthVerifyApi = async () => {
    try {
      const response = await postAuthVerifyApi({
        schoolEmail: email,
        verifyCode: code,
      });
      setIsSuccess('true');

      console.log('callPostAuthVerifyApi', response);
      console.log('isSuccess 성공', isSuccess);
    } catch (error) {
      setIsSuccess('error');
      console.log('callPostAuthVerifyApi error', error);
      console.log('isSuccess 에러', isSuccess);
    }
  };
  const callPutAuthEmailApi = async () => {
    try {
      const response = await putAuthEmailApi({
        // schoolEmail: userInfo.schoolEmail,
        schoolEmail: email,
      });
      //타이머 시작
      resetTimer();
      setIsActive(true);
      updateUserInfo({ schoolEmail: email });
      console.log('callPutAuthEmailApi', response);
    } catch (error) {
      console.log('callPutAuthEmailApi error', error);
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={100} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              height: '80%',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}
          >
            <View>
              <S.ContentStyled>학교 이메일을 입력해 주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '100%' }}>
                <S.TextFiledStyled
                  defaultValue={userInfo.schoolEmail}
                  onChangeText={(text: string) => setEmail(text)}
                  placeholder="example@gachon.ac.kr"
                  placeholderTextColor={colors.textGray2}
                  // onFocus={handleFocus}
                  // onBlur={handleBlur}
                  style={{
                    color: colors.primary,
                    width: '78%',
                    textAlign: 'start',
                    paddingLeft: 20,
                  }}
                />
                {/* 인증 전송 버튼 */}
                <S.ButtonStyled
                  onPress={isSuccess === 'false' && email !== '' ? startTimer : undefined}
                  style={{
                    width: 70,
                    marginBottom: 6,
                    backgroundColor: isSuccess === 'false' ? colors.primary : colors.buttonAuthToggle,
                  }}
                >
                  <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>전송</Text>
                </S.ButtonStyled>
              </S.RowStyled>

              <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                올바른 이메일 형식을 입력해주세요.
              </Text>
            </View>
            <View>
              <S.ContentStyled>인증 코드를 입력해 주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '100%' }}>
                <S.CodeFiledStyled>
                  <S.InputStyled
                    value={code}
                    placeholder="000000"
                    placeholderTextColor={colors.textGray2}
                    onChangeText={setCode}
                    // onFocus={handleFocus2}
                    // onBlur={handleBlur}
                    style={{
                      color: colors.primary,
                      width: '78%',
                      textAlign: 'start',
                    }}
                  />
                  <Text style={{ fontSize: 16, fontFamily: 'fontSemiBold', color: colors.errorMessageRed }}>
                    {isActive === false ? '' : formatTime()}
                  </Text>
                </S.CodeFiledStyled>
                {/* 코드 확인 버튼 */}
                <S.ButtonStyled
                  onPress={time !== 0 && code !== '' && callPostAuthVerifyApi}
                  style={{
                    width: 70,
                    marginBottom: 6,
                    backgroundColor: time !== 0 ? colors.primary : colors.buttonAuthToggle,
                  }}
                >
                  <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>확인</Text>
                </S.ButtonStyled>
              </S.RowStyled>
              {isSuccess === 'error' && (
                <S.RowStyled style={{ justifyContent: 'flex-end', width: deviceWidth * 0.9 }}>
                  <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                    인증 코드가 올바르지 않습니다.
                  </Text>
                  <TouchableOpacity onPress={email !== '' ? callPutAuthEmailApi : undefined}>
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
              )}
              {isSuccess === 'true' && (
                <S.RowStyled style={{ justifyContent: 'flex-end', width: deviceWidth * 0.9 }}>
                  <Text style={{ color: colors.primary, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                    인증 코드가 확인되었습니다.
                  </Text>
                </S.RowStyled>
              )}
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </S.ColumnStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '10%' }}>
        {/* {isRefused ? (
          <S.NextButtonStyled>
            <CustomText font="fontMedium" size="14" color={colors.secondary}>
              수정 완료
            </CustomText>
          </S.NextButtonStyled>
        ) : (
          <> */}
        <TouchableOpacity onPress={movePage()}>
          <Image source={prevButton} />
        </TouchableOpacity>
        {isSuccess !== 'true' ? (
          <Image source={notYetNextButton} />
        ) : (
          <TouchableOpacity onPress={() => handleReset('initProfileStack')}>
            {/* <TouchableOpacity onPress={movePage('initProfileStack')}> */}
            <Image source={nextButton} />
          </TouchableOpacity>
        )}
        {/* </>
        )} */}
      </View>
    </S.Wrapper>
  );
};

export default EmailAuth;
