import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import * as P from '../../MyLibrary/MyLibrary.styles';
import { TitleProgress2 } from './TitleProgress2';
import useMovePage from '../../../commons/hooks/useMovePage';
import { useUserStore } from '../../../commons/store/useUserinfo';
import circle from '../../../../assets/images/icons/Circle.png';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText.styles';
import profileEx1 from '../../../../assets/images/img/profile_ex1.png';
import profileEx2 from '../../../../assets/images/img/profile_ex2.png';
import profileEx3 from '../../../../assets/images/img/profile_ex3.png';
import profileEx4 from '../../../../assets/images/img/profile_ex4.png';
import profileEx5 from '../../../../assets/images/img/profile_ex5.png';
import profileEx6 from '../../../../assets/images/img/profile_ex6.png';
import { ScrollView } from 'react-native-gesture-handler';
import Dash from 'react-native-dash';

const ProfileImage = () => {
  const [hasRunProfileGuide, setHasRunProfileGuide] = useState(false);
  const profileExList = [
    [profileEx1, '얼굴이 잘 보이는 사진'],
    [profileEx2, '취미 생활이 담긴 사진'],
    [profileEx3, '선정적인 사진'],
    [profileEx4, '개인 정보를 노출하는 사진'],
    [profileEx5, '과도한 필터를 사용한 사진'],
    [profileEx6, '본인이 드러나지 않는 사진'],
  ];

  //'앨범에서 선택' 바텀시트 모달
  const handleModifyProfileImageModalRef = useCallback(() => {
    modifyProfileImageModalRef.current?.present();
  }, []);
  const modifyProfileImageModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '50%'], []);

  //'사진 가드' 바텀시트 모달
  const handleProfileGuideModalRef = useCallback(() => {
    modifyProfileGuideModalRef.current?.present();
  }, []);
  const modifyProfileGuideModalRef = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ['50%', '80%'], []);

  useEffect(() => {
    // Call handleProfileGuideModalRef() when component mounts if it hasn't run yet
    if (!hasRunProfileGuide) {
      handleProfileGuideModalRef();
      setHasRunProfileGuide(true); // Set the flag to true to indicate it has run
    }
  }, []);

  const { movePage } = useMovePage();
  const { updateUserInfo, userInfo } = useUserStore();
  //   const [imageUrl, setImageUrl] = useState('');

  //이미지 업로드 함수
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        alert('갤러리에 대한 접근 권한이 필요합니다.');
        return null;
      }
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (result.canceled) {
      return null; //이미지 업로드 취소시
    }

    // setImageUrl(result.assets[0].uri);
    updateUserInfo('profileImageUrl', result.assets[0].uri);
  };
  // console.log('status.granted:', status?.granted, 'status.status:', status?.status);
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={25} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center', marginBottom: '15%' }}>
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
          <TouchableOpacity onPress={handleModifyProfileImageModalRef}>
            <Image
              source={
                userInfo.profileImageUrl === ''
                  ? require('../../../../assets/images/icons/Circle.png')
                  : { uri: userInfo.profileImageUrl }
              }
              style={
                userInfo.profileImageUrl === ''
                  ? { height: 190, aspectRatio: 1 }
                  : { height: 190, aspectRatio: 1, borderRadius: 100 }
              }
            />
          </TouchableOpacity>
          <S.ButtonStyled
            onPress={() => handleProfileGuideModalRef()}
            style={{ height: 44, width: 150, backgroundColor: colors.primary, marginTop: 26 }}
          >
            <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>사진 가이드 보기</Text>
          </S.ButtonStyled>
        </View>
      </S.ColumnStyled>
      <CustomBottomSheetModal ref={modifyProfileImageModalRef} index={0} snapPoints={snapPoints}>
        <P.ProfileImageBottomSheetContainer>
          <P.ProfileImageModificationButton onPress={uploadImage}>
            <CustomText size="16px" font="fontRegular">
              앨범에서 사진 선택
            </CustomText>
          </P.ProfileImageModificationButton>
        </P.ProfileImageBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={modifyProfileGuideModalRef} index={0} snapPoints={snapPoints2}>
        <ScrollView>
          <P.ProfileImageBottomSheetContainer style={{ paddingLeft: 0, paddingRight: 0 }}>
            <CustomText size="20px" font="fontSemiBold">
              프로필 사진 가이드
            </CustomText>
            <S.DividerLine />
            <S.ColumnStyled style={{ alignItems: 'start', height: 'auto', width: '100%' }}>
              <CustomText style={{ textAlign: 'start' }}>👏이런 사진을 추천해요</CustomText>
            </S.ColumnStyled>
            <S.RoundRectStyled style={{ padding: 12 }}>
              <CustomText size="12px" font="fontRegular">
                •이목구비를 확인할 수 있는 본인 사진이어야 해요
              </CustomText>
              <CustomText size="12px" font="fontRegular" style={{ marginTop: 5 }}>
                •나를 잘 표현할 수 있는 취미 사진도 괜찮아요
              </CustomText>
            </S.RoundRectStyled>
            <S.RowStyled style={{ width: '100%' }}>
              {profileExList.slice(0, 2).map((profileEx, index) => (
                <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', margin: 12 }}>
                  <Image source={profileEx[0]} style={{ width: 162, height: 162 }} />
                  <CustomText size="16px" style={{ marginTop: 8 }}>
                    {profileEx[1]}
                  </CustomText>
                </S.ColumnStyled>
              ))}
            </S.RowStyled>
            <Dash
              style={{
                width: '100%',
                height: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 20,
                marginTop: 20,
              }}
              dashGap={5}
              dashLength={5}
              dashThickness={1.5}
              dashColor={colors.lineDivider}
            />
            <S.ColumnStyled style={{ alignItems: 'start', height: 'auto', width: '100%' }}>
              <CustomText>🚫이런 사진은 승인이 어려워요</CustomText>
            </S.ColumnStyled>
            <S.ColumnStyled style={{ height: 'auto', width: '100%' }}>
              <S.RoundRectStyled style={{ padding: 12 }}>
                <CustomText size="12px" font="fontRegular">
                  •선정적이거나 개인정보를 노출하는 이미지
                </CustomText>
                <CustomText size="12px" font="fontRegular" style={{ marginTop: 5 }}>
                  •본인을 잘 나타내지 않는 이미지
                </CustomText>
              </S.RoundRectStyled>
              <S.RowStyled style={{ width: '100%' }}>
                {profileExList.slice(2, 4).map((profileEx, index) => (
                  <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', margin: 12 }}>
                    <Image source={profileEx[0]} style={{ width: 162, height: 162 }} />
                    <CustomText size="14px" style={{ marginTop: 8 }}>
                      {profileEx[1]}
                    </CustomText>
                  </S.ColumnStyled>
                ))}
              </S.RowStyled>
              <S.RowStyled style={{ width: '100%' }}>
                {profileExList.slice(4, 6).map((profileEx, index) => (
                  <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', margin: 12 }}>
                    <Image source={profileEx[0]} style={{ width: 162, height: 162 }} />
                    <CustomText size="14px" style={{ marginTop: 8 }}>
                      {profileEx[1]}
                    </CustomText>
                  </S.ColumnStyled>
                ))}
              </S.RowStyled>
            </S.ColumnStyled>
          </P.ProfileImageBottomSheetContainer>
        </ScrollView>
      </CustomBottomSheetModal>
      <S.NextButtonStyled onPress={movePage('openChatLink')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default ProfileImage;
