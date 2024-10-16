import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import { postAuthEmailApi, postAuthVerifyApi } from '@commons/api/members/email/memberEmail';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { IsSuccess, useEmailStatusStore } from '@commons/store/members/emailStatus/useEmailStatusStore';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import _ from 'lodash';
import { useEffect, useState } from 'react';
import {
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from '../../InitUserInfo.styles';

const EmailAuth = () => {
  useHeaderControl({
    title: '학교 이메일 인증',
    left: false,
  });
  useScreenLogger();
  useAppUIManager();
  const showToast = useToastStore((state) => state.showToast);
  const { isSuccess, time, code, isActive, setCode, setIsSuccess, setTime, setIsActive, startTimer, resetTimer } =
    useEmailStatusStore();

  const [email, setEmail] = useState('');
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();

  useEffect(() => {
    console.log('isSuccess', isSuccess);
  }, [isSuccess]);

  const debounceSendEmail = _.debounce(async () => {
    setIsSuccess(IsSuccess.done);
    callPostAuthEmailApi();
  }, 500);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const callPostAuthEmailApi = async () => {
    try {
      const response = await postAuthEmailApi({
        schoolEmail: email,
        schoolName: userInfo.schoolName,
      });
      //타이머 시작
      resetTimer();
      startTimer();

      updateUserInfo({ schoolEmail: email });

      console.log('callPostEmailAuthApi', response);
      showToast({
        content: '인증 코드가 전송되었습니다.',
      });
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      console.log('callPostAuthApi error', error);
      setIsSuccess(IsSuccess.false);
      if (error.response.data.message === '이메일이 이미 존재합니다.') {
        showToast({
          content: '이메일이 이미 존재합니다.',
        });
      } else if (error.response.data.code === 'member_email_011') {
        showToast({
          content: '학교 이메일의 도메인 URL이 해당 학교와 맞지 않습니다.',
        });
      }
    }
  };

  const debounceVerifyCode = _.debounce(async () => {
    await callPostAuthVerifyApi();
  }, 500);

  const callPostAuthVerifyApi = async () => {
    try {
      const response = await postAuthVerifyApi({
        schoolEmail: email,
        verifyCode: code,
        schoolName: userInfo.schoolName,
      });
      setIsSuccess(IsSuccess.true);

      console.log('callPostAuthVerifyApi', response);
      // console.log('isSuccess 성공', isSuccess);
      showToast({
        content: '인증 코드가 확인되었습니다.',
      });

      setIsActive(false);
    } catch (error) {
      setIsSuccess(IsSuccess.error);
      console.log('callPostAuthVerifyApi error', error);
      showToast({
        content: '인증 코드가 올바르지 않습니다.',
      });
    }
  };

  return (
    <S.Wrapper>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 40}
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              height: '100%',
              // justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ marginBottom: 125, marginTop: '34%' }}>
              <S.ContentStyled style={{ textAlign: 'center' }}>학교 이메일을 입력해 주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '93%' }}>
                <S.TextFiledStyled
                  defaultValue={userInfo.schoolEmail}
                  onChangeText={(text: string) => setEmail(text)}
                  placeholder="example@gachon.ac.kr"
                  placeholderTextColor={colors.textGray2}
                  editable={isSuccess === IsSuccess.false || isSuccess === IsSuccess.resend}
                  style={{
                    color: colors.primary,
                    width: '78%',
                    textAlign: 'left',
                    paddingLeft: 20,
                  }}
                />
                {/* 이메일 전송 버튼 */}
                <S.ButtonStyled
                  onPress={() => debounceSendEmail()}
                  disabled={
                    isSuccess === IsSuccess.done ||
                    isSuccess === IsSuccess.error ||
                    isSuccess === IsSuccess.true ||
                    email === ''
                  }
                  style={{
                    width: 70,
                    marginBottom: 6,
                    backgroundColor:
                      (isSuccess !== IsSuccess.false && isSuccess !== IsSuccess.resend) || email === ''
                        ? colors.buttonNavStroke
                        : colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color:
                        (isSuccess !== IsSuccess.false && isSuccess !== IsSuccess.resend) || email === ''
                          ? colors.textGray2
                          : colors.secondary,
                      fontFamily: 'fontMedium',
                      fontSize: 16,
                    }}
                  >
                    전송
                  </Text>
                </S.ButtonStyled>
              </S.RowStyled>
              {isSuccess === IsSuccess.done || isSuccess === IsSuccess.error ? (
                <TouchableOpacity onPress={() => setIsSuccess(IsSuccess.resend)}>
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
                    인증 코드를 다시 받고 싶어요.
                  </Text>
                </TouchableOpacity>
              ) : (
                isSuccess === IsSuccess.false && (
                  <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                    올바른 이메일 형식을 입력해주세요.
                  </Text>
                )
              )}
            </View>
            <View>
              <S.ContentStyled style={{ textAlign: 'center' }}>인증 코드를 입력해 주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '93%' }}>
                <S.CodeFiledStyled>
                  <S.InputStyled
                    maxLength={6}
                    editable={isSuccess !== IsSuccess.true && time !== 0}
                    value={code}
                    placeholder="000000"
                    placeholderTextColor={colors.textGray2}
                    onChangeText={(code: string) => setCode(code)}
                    style={{
                      color: colors.primary,
                      width: '78%',
                      textAlign: 'left',
                    }}
                  />
                  <Text style={{ fontSize: 16, fontFamily: 'fontSemiBold', color: colors.errorMessageRed }}>
                    {isActive === false ? '' : formatTime()}
                  </Text>
                </S.CodeFiledStyled>
                {/* 코드 확인 버튼 */}
                <S.ButtonStyled
                  onPress={() => debounceVerifyCode()}
                  disabled={isSuccess === IsSuccess.false || isSuccess === IsSuccess.true || time === 0 || code === ''}
                  style={{
                    width: 70,
                    marginBottom: 6,
                    backgroundColor:
                      isSuccess === IsSuccess.false || isSuccess === IsSuccess.true || time === 0 || code === ''
                        ? colors.buttonNavStroke
                        : colors.primary,
                  }}
                >
                  <Text
                    style={{
                      color:
                        isSuccess === IsSuccess.false || isSuccess === IsSuccess.true || time === 0 || code === ''
                          ? colors.textGray2
                          : colors.secondary,
                      fontFamily: 'fontMedium',
                      fontSize: 16,
                    }}
                  >
                    확인
                  </Text>
                </S.ButtonStyled>
              </S.RowStyled>
              {isSuccess === IsSuccess.error && (
                <S.RowStyled style={{ justifyContent: 'flex-end', width: deviceWidth * 0.9 }}>
                  <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                    인증 코드가 올바르지 않습니다.
                  </Text>
                </S.RowStyled>
              )}
              {isSuccess === IsSuccess.true && (
                <S.RowStyled style={{ justifyContent: 'flex-end', width: deviceWidth * 0.9 }}>
                  <Text style={{ color: colors.primary, fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                    인증 코드가 확인되었습니다.
                  </Text>
                </S.RowStyled>
              )}
            </View>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        <S.ButtonArea>
          <S.MoveButton onPress={movePage()}>
            <Image source={prevButton} />
          </S.MoveButton>
          {isSuccess !== IsSuccess.true ? (
            <Image source={notYetNextButton} /> //코드 인증 미완료
          ) : (
            <S.MoveButton onPress={movePage('namePhone')}>
              <Image source={nextButton} />
            </S.MoveButton>
          )}
        </S.ButtonArea>
      </KeyboardAvoidingView>
    </S.Wrapper>
  );
};

export default EmailAuth;
