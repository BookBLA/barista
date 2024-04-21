import { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import useMovePage from '../../../commons/hooks/useMovePage';
import { useUserStore } from '../../../commons/store/useUserinfo';
import circle from '../../../../assets/images/icons/Circle.png';
import { TextFiledStyled } from '../../InitStyle/InitStyle.styles';
import useMemberStore from '../../../commons/store/useMemberStore';
import { postPolicyApi } from '../../../commons/api/memberPolicy';
import { useAgreementStore } from '../../../commons/store/useAgreement';
import { postMemberProfileApi } from '../../../commons/api/memberProfille.api';
import useManageMargin from '../../../commons/hooks/useManageMargin';

const OpenChatLink = () => {
  const { movePage } = useMovePage();
  const [link, setLink] = useState('');
  const { updateUserInfo, userInfo, resetUserInfo } = useUserStore();

  const moveNext = async () => {
    // await updateUserInfo('openKakaoRoomUrl', link);
    await callPostPolicyApi();
    await callPostMemberProfileAPi();
    resetUserInfo();
    movePage('waitConfirm')();
  };
  const { agreementInfo } = useAgreementStore();
  const memberId = useMemberStore((state) => state.memberInfo.id);

  const callPostPolicyApi = async () => {
    try {
      const response = await postPolicyApi({
        agreedStatuses: {
          adAgreementPolicy: agreementInfo.adAgreementPolicy,
        },
      });
      console.log('callPostPolicyApi', response);
    } catch (error) {
      console.log('callPostPolicyApi error', error);
    }
  };
  useEffect(() => {
    console.log('link', link);
    console.log('userInfo', userInfo);
  }, [userInfo]);

  const callPostMemberProfileAPi = async () => {
    try {
      // await updateUserInfo('openKakaoRoomUrl', link);
      console.log('userInfo', userInfo);
      const response = await postMemberProfileApi(
        //   {
        //   name: userInfo.name,
        //   birthDate: userInfo.birthDate,
        //   gender: userInfo.gender,
        //   schoolName: userInfo.schoolName,
        //   schoolEmail: userInfo.schoolEmail,
        //   phoneNumber: userInfo.phoneNumber,
        //   studentIdImageUrl: userInfo.studentIdImageUrl,
        //   profileImageUrl: userInfo.profileImageUrl,
        //   openKakaoRoomUrl: userInfo.openKakaoRoomUrl,
        // }
        {
          birthDate: '1980-01-01',
          gender: 'FEMALE',
          name: 'Miso',
          openKakaoRoomUrl: 'Lou',
          phoneNumber: '891-2830-9182',
          profileImageUrl:
            'file:///Users/kimbamb/Library/Developer/CoreSimulator/Devices/94AE97A1-EE1C-4C17-895C-01FA1C09170B/data/Containers/Data/Application/81B61463-1DE6-4EF3-A5FA-5DCBEA133950/Library/Caches/ExponentExperienceData/@anonymous/bookbla-1574cc9f-3a93-48db-811b-a65b6623ecd4/ImagePicker/DA38A9F5-27B9-49C1-84A4-011D36DC2B5D.jpg',
          schoolEmail: 'althcjstk08@gachon.ac.kr',
          schoolName: '가천대학교',
          studentIdImageUrl:
            'file:///Users/kimbamb/Library/Developer/CoreSimulator/Devices/94AE97A1-EE1C-4C17-895C-01FA1C09170B/data/Containers/Data/Application/81B61463-1DE6-4EF3-A5FA-5DCBEA133950/Library/Caches/ExponentExperienceData/@anonymous/bookbla-1574cc9f-3a93-48db-811b-a65b6623ecd4/ImagePicker/96A683F5-09A9-4393-8A9C-05CA54833210.jpg',
        },
      );
      console.log('callPostMemberProfileApi', response);
    } catch (error) {
      console.log('callPostMemberProfileApi error', error);
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress2 gauge={50} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.ColumnStyled style={{ height: '80%' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>오픈채팅방 링크 등록</S.ContentStyled>
            <TextFiledStyled
              value={userInfo.openKakaoRoomUrl}
              onChangeText={(text: string) => updateUserInfo('openKakaoRoomUrl', text)}
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
      {userInfo.openKakaoRoomUrl === '' ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={moveNext}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      )}
    </S.Wrapper>
  );
};

export default OpenChatLink;
