import { getProfileImageType, patchMemberProfileImageApi } from '@commons/api/members/profile/memberProfile.api';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { ProfileImageResponse } from '@commons/types/openapiGenerator';
import { useRoute } from '@react-navigation/native';
import { Props } from '@screens/InitStyle/InitStyle.types';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

const ModifyProfile = () => {
  const route = useRoute<Props>();
  const profileUrl = route.params?.profileUrl;
  const showToast = useToastStore((state) => state.showToast);
  useHeaderControl({
    title: '프로필 사진 수정',
    left: true,
  });
  useAppUIManager();
  // const { updateStyleInfo, styleInfo } = useStyleStore();
  const [profile, setProfile] = useState(profileUrl);
  const [profileList, setProfileList] = useState<{ profileImageId: number; profileImageUrl: string }[]>([]);
  const { updateCurrentUserInfo } = useSendbirdChat();

  useEffect(() => {
    callGetProfileImage();
  }, []);

  const handleModifyProfile = async () => {
    await callPatchProfileImage();
  };

  const callGetProfileImage = async () => {
    try {
      const response = await getProfileImageType();
      const profiles = response.result.profileImageResponseTypes.map((item: ProfileImageResponse) => ({
        profileImageId: item.profileImageTypeId,
        profileImageUrl: item.profileImageUrl,
      }));
      setProfileList(profiles);
    } catch (error) {
      console.log('ERROR) getProfileImageType', error);
    }
  };

  const callPatchProfileImage = async () => {
    try {
      const profileImageId = profileList.find((item) => item.profileImageUrl === profile)?.profileImageId;
      const response = await patchMemberProfileImageApi({ profileImageTypeId: profileImageId as number });
      // TODO: update시 채팅 프로필 사진 수정
      // const updatedUserWithUrl = await updateCurrentUserInfo('PROFILE_URL');
      // updatedUserWithUrl;
      showToast({ content: '프로필 사진이 수정되었습니다.' });
    } catch (error) {
      console.log('ERROR) patchProfileImageType', error);
      showToast({ content: '프로필 사진 수정에 실패했습니다.' });
    }
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
        <S.ContentStyled style={{ marginBottom: 38, marginTop: 30 }}>프로필 사진을 선택해 주세요</S.ContentStyled>

        <Image
          source={{ uri: profileList.find((item) => item.profileImageUrl === profile)?.profileImageUrl ?? '' }}
          style={{ width: 161, height: 161, marginBottom: 40 }}
        />

        <S.RowStyled style={{ alignItems: 'center', width: '73%' }}>
          {profileList.map((item) =>
            item.profileImageUrl === profile ? (
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
                    setProfile(item.profileImageUrl);
                    // updateStyleInfo('profileImageTypeId', item.profileImageId);
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
                  setProfile(item.profileImageUrl);
                  // updateStyleInfo('profileImageTypeId', item.profileImageId);
                }}
              >
                <Image source={{ uri: item.profileImageUrl }} style={{ width: 53, height: 53 }} />
              </TouchableOpacity>
            ),
          )}
        </S.RowStyled>
      </View>
      <S.NextButtonStyled onPress={handleModifyProfile} height={44}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>수정</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default ModifyProfile;
