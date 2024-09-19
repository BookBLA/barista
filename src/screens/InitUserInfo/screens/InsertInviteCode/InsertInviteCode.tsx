import nextButton from '@assets/images/buttons/nextButton.png';
import checkCircle from '@assets/images/icons/CheckCircle.png';
import warningCircle from '@assets/images/icons/WarningCircle.png';
import { postInviteCodeVerifyApi } from '@commons/api/invitation/invitation.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { IsSuccess, useInviteCodeStore } from '@commons/store/members/inviteCode/useInviteCodeStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from '../../InitUserInfo.styles';

const InsertInviteCode = () => {
  useAppUIManager();
  useHeaderControl({
    title: '초대 코드 입력',
    left: false,
  });
  const showToast = useToastStore((state) => state.showToast);
  const { movePage } = useMovePage();

  const { isSuccess, code, setCode, setIsSuccess } = useInviteCodeStore();

  // const [code, setCode] = useState('');
  // const [isSuccess, setIsSuccess] = useState('false'); //false: 초기, true: 성공, 'error': 실패

  const callInviteCodeVerifyApi = async () => {
    console.log(isSuccess);
    // 초드코드 확인 api 호출
    try {
      await postInviteCodeVerifyApi(code as string);
      setIsSuccess(IsSuccess.true);
      showToast({
        content: '초대코드가 확인되었습니다.',
      });
    } catch (error) {
      setIsSuccess(IsSuccess.error);
      showToast({
        content: '유효하지 않은 초대코드 입니다.',
      });
    }
  };

  return (
    <S.Wrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '100%',
          }}
        >
          <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
            <S.ContentStyled style={{ marginBottom: 10 }}>초대코드를 입력해 주세요</S.ContentStyled>
            <Text
              style={{
                color: colors.textGray2,
                fontFamily: 'fontLight',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 18,
              }}
            >
              친구에게 받은 초대코드를 입력하시면{'\n'}
              <Text style={{ color: colors.textGray2, fontFamily: 'fontBold' }}>최대 2만원 상당의 혜택</Text>을 드려요!
              {'\n'}
              코드가 없다면 다음으로 넘어가 주세요
            </Text>
            <S.RowStyled style={{ width: '93%' }}>
              <S.CodeFiledStyled>
                <S.InputStyled
                  maxLength={20} // 최대 길이 제한
                  onChangeText={(text: string) => setCode(text)}
                  placeholder="초대 코드"
                  placeholderTextColor={colors.textGray2}
                  editable={isSuccess !== IsSuccess.true}
                  value={code}
                  style={{
                    color: colors.primary,
                    width: '78%',
                    textAlign: 'left',
                    paddingLeft: 5,
                  }}
                />
                {isSuccess !== null && (
                  <Image
                    source={isSuccess === 'true' ? checkCircle : warningCircle}
                    style={{ width: 20, height: 20 }}
                  />
                )}
              </S.CodeFiledStyled>
              <S.ButtonStyled
                onPress={() => callInviteCodeVerifyApi()}
                disabled={code === '' || code === null || isSuccess === IsSuccess.true}
                style={{
                  width: 70,
                  marginBottom: 6,
                  backgroundColor: code === '' || code === null ? colors.buttonNavStroke : colors.primary,
                }}
              >
                <Text
                  style={{
                    color: code === '' || code === null ? colors.textGray2 : colors.secondary,
                    fontFamily: 'fontMedium',
                    fontSize: 16,
                  }}
                >
                  확인
                </Text>
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
      <S.ButtonArea style={{ justifyContent: 'flex-end' }}>
        <S.MoveButton onPress={movePage('mbti')}>
          <Image source={nextButton} />
        </S.MoveButton>
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default InsertInviteCode;
