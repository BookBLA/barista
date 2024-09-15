import { uploadStudentIdImageToS3 } from '@commons/api/image/imageUploadToS3.api';
import { postStudentIdImageApi } from '@commons/api/members/profile/memberProfile.api';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import * as ImagePicker from 'expo-image-picker';
import { useState } from 'react';
import { Alert, Image, Linking, Text, View } from 'react-native';
import uuid from 'react-native-uuid';
import { IProps } from './StudentId.types';

const StudentId = ({ route }: IProps) => {
  useHeaderControl({
    title: '학생증 인증',
    left: true,
  });
  const showToast = useToastStore((state) => state.showToast);

  useScreenLogger();
  // const { updateUserInfo, userInfo } = useUserStore();
  const { movePage, handleReset } = useMovePage();
  const isRejected = route?.params?.isRejected;

  //이미지 업로드 함수
  const [imageUrl, setImageUrl] = useState<string>('');
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        Alert.alert(
          '권한 필요',
          '앱에서 이미지를 업로드하려면 접근 권한이 필요합니다. 설정으로 이동하여 권한을 부여하세요.',
          [
            { text: '취소', style: 'cancel' },
            { text: '설정으로 이동', onPress: () => Linking.openSettings() },
          ],
        );
        return null;
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      // aspect: [4, 3],
      quality: 1,
    });

    if (result.canceled) {
      return null; //이미지 업로드 취소시
    }

    //로직 수정 (이미지 선택시 setState로만 유저 속이기)
    //다음 버튼 누르면 s3 등록
    setImageUrl(result?.assets[0].uri);
    // updateUserInfo({ studentIdImageUrl: result?.assets[0].uri });
  };

  const moveNext = async () => {
    if (imageUrl !== '') {
      const uploadedFileUrl = await uploadStudentIdImageToS3(imageUrl, uuid.v4());
      if (uploadedFileUrl) {
        postStudentIdImage(uploadedFileUrl);
      }
    }
  };

  const postStudentIdImage=async(imgUrl: string)=>{
    try{
      const response=await postStudentIdImageApi(imgUrl);
      console.log('response', response);
      if (isRejected) {
          handleReset('tapScreens');
          return;
        } else {
          movePage()();
        }
        showToast({
          content: '학생증을 검토 중입니다.',
        });
    }
    catch(error){
      console.log('error', error);
      showToast({
          content: '학생증 업로드에 실패했습니다.',
        });
    }
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', alignItems: 'center', marginTop: '50%' }}>
        <S.ContentStyled style={{ marginBottom: 8 }}>학생증 사진을 업로드해 주세요.</S.ContentStyled>
        <Text
          style={{
            color: colors.textGray2,
            fontFamily: 'fontRegular',
            fontSize: 12,
            textAlign: 'center',
            marginBottom: 20,
          }}
        >
          본인 확인을 위해{' '}
          <CustomText color={colors.buttonWrong} size="12px" font="fontRegular">
            얼굴이 잘 보이는 학생증 사진
          </CustomText>
          을 업로드해 주세요{'\n'}학생증이 잘 보이지 않을 경우 가입이 거절될 수 있습니다
        </Text>
        <S.ButtonStyled onPress={() => uploadImage()} style={{ height: 132, marginBottom: 6 }} borderRadius={10}>
          <View style={imageUrl === '' ? { width: 40, height: 40 } : { width: 160, height: 120 }}>
            <Image
              source={imageUrl === '' ? require('@assets/images/photo.png') : { uri: imageUrl }}
              style={{ objectFit: 'contain', width: '100%', height: '100%' }}
            />
          </View>
        </S.ButtonStyled>

        <Text
          style={{
            color: colors.primary,
            fontFamily: 'fontMedium',
            fontSize: 12,
            textAlign: 'right',
            width: '80%',
          }}
        >
          학생증 도용 시 처벌 대상이 될 수 있습니다.
        </Text>
      </View>
      <S.NextButtonStyled
        onPress={moveNext}
        disabled={imageUrl === ''}
        style={{
          backgroundColor: imageUrl === '' ? colors.buttonAuthToggle : colors.primary,
        }}
      >
        <CustomText color={colors.secondary}>다음</CustomText>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default StudentId;
