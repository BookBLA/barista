import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import checkCircle from '@assets/images/icons/CheckCircle.png';
import warningCircle from '@assets/images/icons/WarningCircle.png';
import { postInviteCodeVerifyApi } from '@commons/api/invitation/invitation.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from '../InitUserInfo.styles';

const InsertInviteCode = () => {
  useManageMargin();
  useHeaderControl({
    title: '초대 코드 입력',
    left: false,
  });
  const { movePage } = useMovePage();
  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState('false'); //false: 초기, true: 성공, 'error': 실패

  const callInviteCodeVerifyApi = async () => {
    console.log(isSuccess);
    // 초드코드 확인 api 호출
    try {
      await postInviteCodeVerifyApi(code);
      setIsSuccess('true');
    } catch (error) {
      setIsSuccess('error');
    }
  };

  const nextPage = () => {
    movePage('genderBirth')();
  };

  return (
    <S.Wrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '85%',
            justifyContent: 'space-around',
          }}
        >
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled style={{ marginBottom: 10 }}>초대 코드를 입력해 주세요</S.ContentStyled>
            <Text
              style={{
                color: colors.textGray2,
                fontFamily: 'fontMedium',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 20,
              }}
            >
              친구에게 받은 초대코드를 입력해주세요{'\n'}초대 코드를 입력하면 2만원 상당의 혜택을 드려요!{'\n'}없다면
              다음으로 넘어가 주세요
            </Text>
            <S.RowStyled style={{ width: '93%' }}>
              <S.CodeFiledStyled>
                <S.InputStyled
                  maxLength={6} // 최대 길이 제한
                  onChangeText={(text: string) => setCode(text)}
                  placeholder="초대 코드"
                  placeholderTextColor={colors.textGray2}
                  editable={isSuccess !== 'true'}
                  value={code}
                  style={{
                    color: colors.primary,
                    width: '78%',
                    textAlign: 'left',
                    paddingLeft: 5,
                  }}
                />
                {isSuccess !== 'false' && (
                  <Image
                    source={isSuccess === 'true' ? checkCircle : warningCircle}
                    style={{ width: 20, height: 20 }}
                  />
                )}
              </S.CodeFiledStyled>
              <S.ButtonStyled
                onPress={() => callInviteCodeVerifyApi()}
                disabled={code === '' || isSuccess === 'true'}
                style={{
                  width: 70,
                  marginBottom: 6,
                  backgroundColor: code === '' ? colors.buttonAuthToggle : colors.primary,
                }}
              >
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>확인</Text>
              </S.ButtonStyled>
            </S.RowStyled>
            {isSuccess === 'true' && (
              <S.RowStyled style={{ justifyContent: 'flex-start', width: deviceWidth * 0.9 }}>
                <Text style={{ color: '#2EA16A', fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                  환영합니다!
                </Text>
              </S.RowStyled>
            )}
            {isSuccess === 'error' && (
              <S.RowStyled style={{ justifyContent: 'flex-start', width: deviceWidth * 0.9 }}>
                <Text style={{ color: '#F04C4C', fontFamily: 'fontMedium', fontSize: 12, textAlign: 'right' }}>
                  유효하지 않은 초대코드 입니다.
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
        <S.MoveButton onPress={() => nextPage()}>
          <Image source={nextButton} />
        </S.MoveButton>
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default InsertInviteCode;
