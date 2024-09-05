import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import checkCircle from '@assets/images/icons/CheckCircle.png';
import warningCircle from '@assets/images/icons/WarningCircle.png';
import { postInviteCodeVerifyApi } from '@commons/api/invitation/invitation.api';
import { getMemberStatusesApi } from '@commons/api/members/default/member.api';
import { postPolicyApi } from '@commons/api/members/policy/memberPolicy';
import { postMemberProfileApi } from '@commons/api/members/profile/memberProfile.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { useAgreementStore } from '@commons/store/appStatus/agreement/useAgreement';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { deviceWidth } from '@commons/utils/ui/dimensions/dimensions';
import { useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as S from '../../InitUserInfo.styles';

const InsertInviteCode = () => {
  useManageMargin();
  useHeaderControl({
    title: '초대 코드 입력',
    left: false,
  });
  const showToast = useToastStore((state) => state.showToast);
  const { movePage, handleReset } = useMovePage();
  const { userInfo } = useUserStore();

  const [code, setCode] = useState('');
  const [isSuccess, setIsSuccess] = useState('false'); //false: 초기, true: 성공, 'error': 실패
  const schoolStatus = 'OPEN'; // 'OPEN' or 'CLOSE'

  const callInviteCodeVerifyApi = async () => {
    console.log(isSuccess);
    // 초드코드 확인 api 호출
    try {
      await postInviteCodeVerifyApi(code);
      setIsSuccess('true');
      showToast({
        content: '초대코드가 확인되었습니다.',
      });
    } catch (error) {
      setIsSuccess('error');
      showToast({
        content: '유효하지 않은 초대코드 입니다.',
      });
    }
  };

  const nextPage = async () => {
    //postProfileApi 호출 후
    await callPostPolicyApi();
    await callPostMemberProfileAPi();
  };

  const { agreementInfo } = useAgreementStore();

  const callPostPolicyApi = async () => {
    try {
      const response = await postPolicyApi({
        agreedStatuses: {
          adAgreementPolicy: agreementInfo.adAgreementPolicy,
        },
      });
      console.log('약관 등록 성공', response);
    } catch (error) {
      console.log('약관 등록 실패', error);
    }
  };
  const callPostMemberProfileAPi = async () => {
    try {
      console.log('userInfo', userInfo);
      const response = await postMemberProfileApi({
        name: userInfo.name,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        schoolName: userInfo.schoolName,
        // schoolName: '연세대학교',
        schoolEmail: userInfo.schoolEmail,
        // schoolEmail: 'alth@yonsei.ac.kr',
        phoneNumber: userInfo.phoneNumber,
      });
      console.log('프로필 등록 성공', response);
      //schoolStatus Get api 호출
      //schoolStatus가 "OPEN"이면 completePage로 이동
      const schoolStatusResponse = await getMemberStatusesApi();
      const schoolStatus = schoolStatusResponse.result?.schoolStatus;
      console.log('schoolStatus', schoolStatus);
      if (schoolStatus === 'OPEN') {
        handleReset('completePage');
      } else if (schoolStatus === 'CLOSED') {
        handleReset('inviteFriends');
      }
    } catch (error: any) {
      console.log('프로필 등록 실패', error);
      showToast({
        content: error.response.data.message,
      });
    }
  };
  return (
    <S.Wrapper>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        {/* <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '100%',
          }}
        > */}
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
                <Image source={isSuccess === 'true' ? checkCircle : warningCircle} style={{ width: 20, height: 20 }} />
              )}
            </S.CodeFiledStyled>
            <S.ButtonStyled
              onPress={() => callInviteCodeVerifyApi()}
              disabled={code === '' || isSuccess === 'true'}
              style={{
                width: 70,
                marginBottom: 6,
                backgroundColor: code === '' ? colors.buttonNavStroke : colors.primary,
              }}
            >
              <Text
                style={{
                  color: code === '' ? colors.textGray2 : colors.secondary,
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
        {/* </KeyboardAwareScrollView> */}
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
