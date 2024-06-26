import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { Image, Text, TouchableOpacity, View, Alert, Linking } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import uuid from 'react-native-uuid';
// import useMemberStore from '../../../commons/store/useMemberStore';
import { uploadStudentIdImageToS3 } from '../../../commons/api/imageUploadToS3.api';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';

const SchoolStudentID = () => {
  // const [school, setSchool] = useState('학교');
  // const [isFocused, setIsFocused] = useState(false);

  // const handleFocus = () => {
  //   if (!isFocused) {
  //     setSchool(''); // Clear the text when the TextInput is focused for the first time
  //     setIsFocused(true);
  //   }
  // };
  // const handleBlur = () => {
  //   if (school === '') {
  //     setSchool('학교'); // Restore the initial text if the TextInput is left empty
  //     setIsFocused(false);
  //   }
  // };
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  // const memberId = useMemberStore((state) => state.memberInfo.id);

  //이미지 업로드 함수
  const [imageUrl, setImageUrl] = useState(userInfo.studentIdImageUrl);
  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();
  const uploadeImage = async () => {
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
    updateUserInfo({ studentIdImageUrl: result?.assets[0].uri });
  };

  const moveNext = async () => {
    updateUserInfo({ schoolName: '가천대학교' });
    movePage('emailAuth')();

    const uploadedFileUrl = await uploadStudentIdImageToS3(imageUrl, uuid.v4());
    if (uploadedFileUrl) {
      updateUserInfo({ studentIdImageUrl: uploadedFileUrl });
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      {/* <S.ColumnStyled style={{ height: 'auto', justifyContent: 'space-between' }}> */}
      {/* <View style={{ width: '100%', alignItems: 'center' }}> */}
      {/* <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
        <S.ButtonStyled disabled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>가천대학교</Text>
        </S.ButtonStyled> */}
      {/* <S.TextFiledStyled
            value={school}
            onChangeText={setSchool}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              color: school === '학교' ? colors.textGray2 : colors.primary,
            }}
          /> */}
      {/* </View> */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <S.ContentStyled style={{ marginBottom: 8 }}>학생증 사진을 업로드해 주세요.</S.ContentStyled>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12 }}>
          실물 학생증 및 모바일 학생증 모두 가능합니다.
        </Text>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12, marginBottom: 16 }}>
          실물 학생증의 경우 카드번호를 가리고 업로드해 주세요.
        </Text>
        <S.ButtonStyled onPress={() => uploadeImage()} style={{ height: 132, marginBottom: 6 }} borderRadius={10}>
          <View style={imageUrl === '' ? { width: 40, height: 40.52 } : { width: 160, height: 120 }}>
            <Image
              source={
                userInfo.studentIdImageUrl === '' ? require('../../../../assets/images/photo.png') : { uri: imageUrl }
              }
              style={{ objectFit: 'contain', width: '100%', height: '100%', borderRadius: 10 }}
            />
          </View>
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
      {/* </S.ColumnStyled> */}
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {userInfo.studentIdImageUrl === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={moveNext}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default SchoolStudentID;
