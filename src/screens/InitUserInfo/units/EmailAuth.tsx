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
import { postPolicyApi } from '../../../commons/api/memberPolicy';
import { useAgreementStore } from '../../../commons/store/useAgreement';
import { postAuthApi } from '../../../commons/api/memberAuth';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';

const EmailAuth = ({ isRefused }: { isRefused?: boolean }) => {
  const [email, setEamil] = useState('');
  const [code, setCode] = useState('000000');
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage, handleReset } = useMovePage();
  const [isFocused1, setIsFocused1] = useState(false);
  const [isFocused2, setIsFocused2] = useState(false);
  const { agreementInfo } = useAgreementStore();

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
    callPostPolicyApi();
    callPostAuthApi();
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
    }
    if (code === '') {
      setCode('000000');
      setIsFocused2(false);
    }
    updateUserInfo('schoolEmail', email);
  };

  const callPostPolicyApi = async () => {
    try {
      const response = await postPolicyApi(
        {
          agreedStatuses: {
            adAgreementPolicy: agreementInfo.adAgreementPolicy,
          },
        },
        1,
      );
      // console.log('callPostPolicyApi', response);
    } catch (error) {
      console.log('callPostPolicyApi error', error);
    }
  };

  const callPostAuthApi = async () => {
    try {
      const response = await postAuthApi(
        {
          // phoneNumber: userInfo.phoneNumber,
          // studentIdImageUrl: userInfo.studentIdImageUrl,
          schoolEmail: userInfo.schoolEmail,
          // phoneNumber: '010-1234-5678',
          // studentIdImageUrl: 'https://www.google.com',
          // schoolEmail: 'althcjstk08@gachon.ac.kr',
        },
        1,
      );
      // console.log('callPostAuthApi', response);
    } catch (error) {
      console.log('callPostAuthApi error', error);
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
                  // value={userInfo.schoolEmail === '' ? email : userInfo.schoolEmail}
                  defaultValue={userInfo.schoolEmail}
                  onChangeText={(text: string) => setEamil(text)}
                  placeholder="example@gachon.ac.kr"
                  placeholderTextColor={colors.textGray2}
                  // onFocus={handleFocus}
                  onBlur={() => updateUserInfo('schoolEmail', email)}
                  style={{
                    color: colors.primary,
                    width: '78%',
                    textAlign: 'start',
                    paddingLeft: 20,
                  }}
                />
                <S.ButtonStyled
                  onPress={userInfo.schoolEmail !== '' ? startTimer : undefined}
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
              <S.RowStyled style={{ width: '100%' }}>
                <S.CodeFiledStyled>
                  <S.InputStyled
                    value={code}
                    onChangeText={setCode}
                    onFocus={handleFocus2}
                    onBlur={handleBlur}
                    style={{
                      color: code === '000000' ? colors.textGray2 : colors.primary,
                      width: '78%',
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
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </S.ColumnStyled>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '10%' }}>
        {isRefused ? (
          <S.NextButtonStyled>
            <CustomText font="fontMedium" size="14" color={colors.secondary}>
              수정 완료
            </CustomText>
          </S.NextButtonStyled>
        ) : (
          <>
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
            <TouchableOpacity onPress={() => handleReset('initProfileStack')}>
              {/* <TouchableOpacity onPress={movePage('initProfileStack')}> */}
              <Image source={nextButton} />
            </TouchableOpacity>
          </>
        )}
      </View>
    </S.Wrapper>
  );
};

export default EmailAuth;
