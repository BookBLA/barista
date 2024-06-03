import { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import useMovePage from '../../../commons/hooks/useMovePage';
import { useUserStore } from '../../../commons/store/useUserinfo';
import { OpenChatTextFiledStyled } from '../../InitStyle/InitStyle.styles';
import useMemberStore from '../../../commons/store/useMemberStore';
import { postPolicyApi } from '../../../commons/api/memberPolicy';
import { useAgreementStore } from '../../../commons/store/useAgreement';
import { postMemberProfileApi } from '../../../commons/api/memberProfile.api';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import { deviceHeight } from '../../../commons/utils/dimensions';

const OpenChatLink = () => {
  const { movePage } = useMovePage();
  useManageMargin();
  // const [link, setLink] = useState('');
  const { updateUserInfo, userInfo } = useUserStore();

  const moveNext = async () => {
    await callPostPolicyApi();
    await callPostMemberProfileAPi();
    movePage('waitConfirm')();
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
      <TitleProgress2 gauge={50} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        {/* <S.ColumnStyled style={{ height: '80%' }}> */}
        <S.ColumnStyled style={{ height: 'auto' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>오픈채팅방 링크 등록</S.ContentStyled>
            <OpenChatTextFiledStyled
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
