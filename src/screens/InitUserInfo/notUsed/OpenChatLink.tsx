import { postPolicyApi } from '@commons/api/members/policy/memberPolicy';
import { postMemberProfileApi } from '@commons/api/members/profile/memberProfile.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { useAgreementStore } from '@commons/store/appStatus/agreement/useAgreement';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { colors } from '@commons/styles/variablesStyles';
import { OpenChatTextFiledStyled } from '@screens/InitStyle/InitStyle.styles';
import { Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import * as S from '../InitUserInfo.styles';
import { TitleProgress } from './TitleProgress';

const OpenChatLink = () => {
  const { movePage, handleReset } = useMovePage();
  useManageMargin();
  useHeaderControl({
    title: '채팅방 등록',
    left: true,
  });
  const { updateUserInfo, userInfo } = useUserStore();

  const moveNext = async () => {
    await callPostPolicyApi();
    await callPostMemberProfileAPi();
    handleReset('inviteFriends');
  };
  const { agreementInfo } = useAgreementStore();
  // const memberId = useMemberStore((state) => state.memberInfo.id);

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
      // await updateUserInfo('openKakaoRoomUrl', link);
      console.log('userInfo', userInfo);
      const response = await postMemberProfileApi({
        name: userInfo.name,
        birthDate: userInfo.birthDate,
        gender: userInfo.gender,
        schoolName: userInfo.schoolName,
        schoolEmail: userInfo.schoolEmail,
        phoneNumber: userInfo.phoneNumber,
        studentIdImageUrl: userInfo.studentIdImageUrl,
        profileImageUrl: userInfo.profileImageUrl,
        openKakaoRoomUrl: userInfo.openKakaoRoomUrl,
      });
      console.log('프로필 등록 성공', response);
    } catch (error) {
      console.log('프로필 등록 실패', error);
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <S.ColumnStyled style={{ height: '80%' }}> */}
        <S.ColumnStyled style={{ height: 'auto' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>오픈채팅방 링크 등록해 주세요.</S.ContentStyled>
            <Text
              style={{
                color: colors.textGray3,
                fontFamily: 'fontLight',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              알파벳으로 된 URL 링크만 붙여 넣어주세요.{'\n'}
              링크만 입력해 주셔야 채팅을 보낼 수 있습니다.
            </Text>
            <OpenChatTextFiledStyled
              placeholder="부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다."
              value={userInfo.openKakaoRoomUrl}
              onChangeText={(text: string) => updateUserInfo({ openKakaoRoomUrl: text })}
              // onFocus={handleFocus}
              // onBlur={handleBlur}
              style={{
                color: colors.primary,
              }}
            />
            <S.ButtonStyled
              onPress={movePage('infoOpenChat')}
              style={{ height: 44, width: 150, backgroundColor: colors.primary, marginTop: 26 }}
            >
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>링크 가져오는 법</Text>
            </S.ButtonStyled>
          </View>
        </S.ColumnStyled>
      </TouchableWithoutFeedback>

      <S.NextButtonStyled
        onPress={userInfo.openKakaoRoomUrl === '' ? undefined : moveNext}
        style={{ backgroundColor: userInfo.openKakaoRoomUrl === '' ? colors.buttonAuthToggle : colors.primary }}
      >
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default OpenChatLink;
