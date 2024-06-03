import { colors } from '../../../../../commons/styles/variablesStyles';
import * as S from '../../../InitUserInfo.styles';
import { Image, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { TitleProgress } from '../../TitleProgress';
import { useUserStore } from '../../../../../commons/store/useUserinfo';
import uuid from 'react-native-uuid';
import { uploadStudentIdImageToS3 } from '../../../../../commons/api/imageUploadToS3.api';
import { CustomText } from '../../../../../commons/components/TextComponents/CustomText/CustomText';
import { useCounter } from '../../../../../commons/store/useCounter';
import useMemberStore from '../../../../../commons/store/useMemberStore';

const StudentID = () => {
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const { increment } = useCounter();
  const { updateUserInfo, userInfo } = useUserStore();

  //이미지 업로드 함수
  const [imageUrl, setImageUrl] = useState(userInfo.studentIdImageUrl);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const uploadeImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
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

    const uploadedFileUrl = await uploadStudentIdImageToS3(result?.assets[0].uri, memberId);
    if (uploadedFileUrl) {
      updateUserInfo({ studentIdImageUrl: uploadedFileUrl });
      // setImageUrl(String(uploadedFileUrl));
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      <View style={{ width: '100%', alignItems: 'center', height: 'auto' }}>
        <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
        <S.ButtonStyled disabled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>가천대학교</Text>
        </S.ButtonStyled>
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <S.ContentStyled style={{ marginBottom: 8 }}>학생증 사진을 업로드해 주세요.</S.ContentStyled>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12 }}>
          실물 학생증 및 모바일 학생증 모두 가능합니다.
        </Text>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12, marginBottom: 16 }}>
          실물 학생증의 경우 카드번호를 가리고 업로드해 주세요.
        </Text>
        <S.ButtonStyled onPress={() => uploadeImage()} style={{ height: 132, marginBottom: 6 }} borderRadius={10}>
          <Image
            source={{ uri: userInfo.studentIdImageUrl }}
            style={userInfo.studentIdImageUrl === '' ? { width: 40, height: 40.52 } : { width: 160, height: 120 }}
          />
        </S.ButtonStyled>

        <Text
          style={{
            color: colors.textGray,
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
        style={{
          backgroundColor: userInfo.studentIdImageUrl === imageUrl ? colors.buttonAuthToggle : colors.primary,
        }}
        onPress={userInfo.studentIdImageUrl === imageUrl ? null : () => increment()}
      >
        <CustomText font="fontMedium" size="14" color={colors.secondary}>
          수정 완료
        </CustomText>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default StudentID;
