import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress } from './TitleProgress';
import { TitleProgress2 } from './TitleProgress2';
import useMovePage from '../../../commons/hooks/useMovePage';
import { useUserStore } from '../../../commons/store/useUserinfo';
import circle from '../../../../assets/images/icons/Circle.png';

const ProfileImage = () => {
  const { movePage } = useMovePage();
  const { updateUserInfo, userInfo } = useUserStore();
  //   const [imageUrl, setImageUrl] = useState('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  // const uploadeImage = async () => {
  //   if (!status?.granted) {
  //     const permission = await requestPermission();
  //     if (!permission.granted) {
  //       return null;
  //     }
  //   }
  //   const result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [1, 1],
  //     quality: 1,
  //   });
  //   if (result.canceled) {
  //     return null; //이미지 업로드 취소시
  //   }

  //   // setImageUrl(result.assets[0].uri);
  //   updateUserInfo('profileImageUrl', result.assets[0].uri);
  // };
  useEffect(() => {
    const requestPermissionIfNeeded = async () => {
      if (!status?.granted || status?.status === 'denied') {
        const permission = await requestPermission();
        if (!permission.granted) {
          // 권한 거부됨
          // 여기서 사용자에게 권한을 요청하는 모달이나 메시지를 보여줄 수 있습니다.
        }
      }
    };

    requestPermissionIfNeeded();
  }, [status, requestPermission]);

  const uploadImage = async () => {
    if (!status?.granted || status?.status === 'denied') {
      // 이미지 권한이 없는 경우, 권한을 요청합니다.
      await requestPermission();
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
    if (result.canceled) {
      return null; //이미지 업로드 취소시
    }

    updateUserInfo('profileImageUrl', result.assets[0].uri);
  };
  console.log('status.granted:', status?.granted, 'status.status:', status?.status);
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={25} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>프로필 사진 등록</S.ContentStyled>
          <Text
            style={{
              color: colors.textGray3,
              fontFamily: 'fontLight',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 30,
            }}
          >
            본인 얼굴이 나온 사진으로 등록하면 매칭률이 80% 높아져요!{'\n'}프로필 사진은 모두 흐릿하게 보여지며{'\n'}
            매칭이 성사된 상대에게만 원본 사진으로 보입니다
          </Text>

          <Image
            source={
              userInfo.profileImageUrl === ''
                ? require('../../../../assets/images/icons/Circle2.png')
                : { uri: userInfo.profileImageUrl }
            }
            style={
              userInfo.profileImageUrl === ''
                ? { height: 190, aspectRatio: 1 }
                : { height: 190, aspectRatio: 1, borderRadius: 100 }
            }
          />
          <S.ButtonStyled
            onPress={() => uploadImage()}
            style={{ height: 44, width: 150, backgroundColor: colors.primary, marginTop: 26 }}
          >
            <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>사진 등록하기</Text>
          </S.ButtonStyled>
        </View>
      </S.ColumnStyled>
      <S.NextButtonStyled onPress={movePage('openChatLink')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default ProfileImage;
