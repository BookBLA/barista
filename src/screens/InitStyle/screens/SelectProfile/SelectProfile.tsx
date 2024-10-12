import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import { getProfileImageType } from '@commons/api/members/profile/memberProfile.api';
import { postMemberStyleApi } from '@commons/api/members/styles/memberStyle.api';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useInviteCodeStore } from '@commons/store/members/inviteCode/useInviteCodeStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';
import { ProfileImageResponse } from '@commons/types/openapiGenerator';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { postSendbird } from '@commons/api/auth/login.api';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';

const SelectProfile = () => {
  const showToast = useToastStore((state) => state.showToast);
  const setToken = useAuthStore((state) => state.setToken);
  useHeaderControl({
    title: '스타일',
    left: false,
  });
  useAppUIManager();
  const { updateStyleInfo, styleInfo, resetStyleInfo } = useStyleStore();
  const { movePage, handleReset } = useMovePage();
  const { updateMemberInfo } = useMemberStore();
  const { resetInviteCodeStore } = useInviteCodeStore();
  const [profile, setProfile] = useState(styleInfo.profileImageTypeId);
  const [profileList, setProfileList] = useState<{ profileImageId: number; profileImageUrl: string }[]>([]);

  useEffect(() => {
    callGetProfileImage();
  }, []);

  const nextPage = async () => {
    await callPostStyleApi();
  };

  const callGetProfileImage = async () => {
    try {
      const response = await getProfileImageType();
      const profiles = response.result.profileImageResponseTypes.map((item: ProfileImageResponse) => ({
        profileImageId: item.profileImageTypeId,
        profileImageUrl: item.profileImageUrl,
      }));
      styleInfo.profileImageTypeId === 0 && setProfile(profiles[0].profileImageId);
      updateStyleInfo('profileImageTypeId', profiles[0].profileImageId);
      setProfileList(profiles);
    } catch (error) {
      console.log('ERROR) GetProfileImageType', error);
    }
  };

  const callPostStyleApi = async () => {
    try {
      console.log('styleInfo', styleInfo);
      const styleResponse = await postMemberStyleApi(styleInfo);
      console.log('postMemberStyleApi', styleResponse);
      updateMemberInfo('memberStatus', EMemberStatus.BOOK);

      const sendbirdResponse = await postSendbird();
      setToken({ sendbird: sendbirdResponse.result.sendbirdToken });

      handleReset('initBookStack');
      resetStyleInfo();
      resetInviteCodeStore();
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      console.log('ERROR) postMemberStyleApi', error);
      showToast({
        content: error.response.data.message,
      });
    }
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
        <S.ContentStyled style={{ marginBottom: 38, marginTop: 30 }}>프로필 사진을 선택해 주세요</S.ContentStyled>

        <Image
          source={{ uri: profileList.find((item) => item.profileImageId === profile)?.profileImageUrl ?? '' }}
          style={{ width: 161, height: 161, marginBottom: 40 }}
        />

        <S.RowStyled style={{ alignItems: 'center', width: '73%' }}>
          {profileList.map((item) =>
            item.profileImageId === profile ? (
              <LinearGradient
                key={item.profileImageId}
                style={{
                  width: 62,
                  height: 62,
                  borderRadius: 100,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                colors={['#5B247A', '#1BCEDF']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <TouchableOpacity
                  key={item.profileImageId}
                  onPress={() => {
                    setProfile(item.profileImageId);
                    updateStyleInfo('profileImageTypeId', item.profileImageId);
                  }}
                  style={{ borderColor: 'white', borderWidth: 3.5, borderRadius: 100 }}
                >
                  <Image source={{ uri: item.profileImageUrl }} style={{ width: 53, height: 53 }} />
                </TouchableOpacity>
              </LinearGradient>
            ) : (
              <TouchableOpacity
                key={item.profileImageId}
                onPress={() => {
                  setProfile(item.profileImageId);
                  updateStyleInfo('profileImageTypeId', item.profileImageId);
                }}
              >
                <Image source={{ uri: item.profileImageUrl }} style={{ width: 53, height: 53 }} />
              </TouchableOpacity>
            ),
          )}
        </S.RowStyled>
      </View>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        <S.MoveButton onPress={nextPage}>
          <Image source={nextButton} />
        </S.MoveButton>
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default SelectProfile;
