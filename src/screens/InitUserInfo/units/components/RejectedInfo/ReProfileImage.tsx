import { uploadImageToS3 } from '@commons/api/image/imageUploadToS3.api';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useCounter } from '@commons/store/features/counter/useCounter';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { colors } from '@commons/styles/variablesStyles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { TitleProgress } from '@screens/InitStyle/units/TitleProgress';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import * as P from '@screens/Library/Library.styles';
import * as ImagePicker from 'expo-image-picker';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Dash from 'react-native-dash';
import { ScrollView } from 'react-native-gesture-handler';
import uuid from 'react-native-uuid';

const profileExList = [
  [img.profileEx1, '얼굴이 잘 보이는 사진'],
  [img.profileEx2, '취미 생활이 담긴 사진'],
  [img.profileEx3, '선정적인 사진'],
  [img.profileEx4, '개인 정보를 노출하는 사진'],
  [img.profileEx5, '과도한 필터를 사용한 사진'],
  [img.profileEx6, '본인이 드러나지 않는 사진'],
];

const ReProfileImage = () => {
  useHeaderControl({
    title: '프로필',
    left: false,
  });
  const [hasRunProfileGuide, setHasRunProfileGuide] = useState(false);

  const { increment } = useCounter();
  const { handleCloseBottomSheet, bottomRef, handleOpenBottomSheet } = useBottomSheet();

  //'앨범에서 선택' 바텀시트 모달
  const handleModifyProfileImageModalRef = useCallback(() => {
    // bottomRef.current?.present();
    handleOpenBottomSheet();
  }, []);
  // const bottomRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%'], []);

  //'사진 가드' 바텀시트 모달
  const handleProfileGuideModalRef = useCallback(() => {
    modifyProfileGuideModalRef.current?.present();
  }, []);
  const modifyProfileGuideModalRef = useRef<BottomSheetModal>(null);
  const snapPoints2 = useMemo(() => ['80%'], []);

  useEffect(() => {
    // Call handleProfileGuideModalRef() when component mounts if it hasn't run yet
    if (!hasRunProfileGuide) {
      handleProfileGuideModalRef();
      setHasRunProfileGuide(true); // Set the flag to true to indicate it has run
    }
  }, []);

  const { updateUserInfo, userInfo } = useUserStore();
  const [imageUrl, setImageUrl] = useState(userInfo.profileImageUrl);

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
      aspect: [1, 1],
      quality: 1,
    });
    if (result.canceled) {
      return null; //이미지 업로드 취소시
    }

    const randomId = uuid.v4();
    // setImageUrl(result?.assets[0].uri);
    const uploadedFileUrl = await uploadImageToS3(result?.assets[0].uri, randomId);

    if (uploadedFileUrl) updateUserInfo({ profileImageUrl: uploadedFileUrl });
    handleCloseBottomSheet();
  };
  // console.log('status.granted:', status?.granted, 'status.status:', status?.status);
  return (
    <S.Wrapper>
      <TitleProgress gauge={25} />
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
          <TouchableOpacity onPress={handleOpenBottomSheet}>
            <Image
              source={{ uri: userInfo.profileImageUrl }}
              style={
                imageUrl === '' ? { height: 190, aspectRatio: 1 } : { height: 190, aspectRatio: 1, borderRadius: 100 }
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
      <CustomBottomSheetModal ref={bottomRef} index={0} snapPoints={snapPoints}>
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
              <CustomText style={{ textAlign: 'left' }}>👏이런 사진을 추천해요</CustomText>
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
                <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', marginTop: 12 }}>
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
                  <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', marginTop: 12 }}>
                    <Image source={profileEx[0]} style={{ width: 162, height: 162 }} />
                    <CustomText size="14px" style={{ marginTop: 8 }}>
                      {profileEx[1]}
                    </CustomText>
                  </S.ColumnStyled>
                ))}
              </S.RowStyled>
              <S.RowStyled style={{ width: '100%' }}>
                {profileExList.slice(4, 6).map((profileEx, index) => (
                  <S.ColumnStyled key={index} style={{ width: 'auto', height: 'auto', marginTop: 12 }}>
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
      <S.NextButtonStyled
        onPress={userInfo.profileImageUrl === imageUrl ? null : () => increment()}
        style={{
          backgroundColor: userInfo.profileImageUrl === imageUrl ? colors.buttonAuthToggle : colors.primary,
        }}
      >
        <Text
          style={{
            color: colors.secondary,
            fontFamily: 'fontMedium',
            fontSize: 16,
          }}
        >
          다음
        </Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default ReProfileImage;
