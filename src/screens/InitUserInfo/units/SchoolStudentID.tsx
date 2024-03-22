import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, KeyboardAvoidingView, Platform, ScrollView, Text } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
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
  useEffect(() => {
    updateUserInfo('schoolName', '가천대학교');
  }, []);

  //이미지 업로드 함수
  // const [imageUrl, setImageUrl] = useState('');
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

    // setImageUrl(result.assets[0].uri);
    updateUserInfo('studentIdImageUrl', result.assets[0].uri);
  };
  // console.log('학교', userInfo.schoolName);
  // console.log('imageUrl', imageUrl);
  // console.log('userInfo.studentIdImageUrl', userInfo.studentIdImageUrl);
  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      <S.ColumnStyled>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
          <S.ButtonStyled>
            <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>가천대학교</Text>
          </S.ButtonStyled>
          {/* <S.TextFiledStyled
            value={school}
            onChangeText={setSchool}
            onFocus={handleFocus}
            onBlur={handleBlur}
            style={{
              color: school === '학교' ? colors.textGray2 : colors.primary,
            }}
          /> */}
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled style={{ marginBottom: 8 }}>학생증 사진을 업로드해 주세요.</S.ContentStyled>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12 }}>
            실물 학생증 및 모바일 학생증 모두 가능합니다.
          </Text>
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12, marginBottom: 16 }}>
            실문 학생증의 경우 카드번호를 가리고 업로드 해주세요.
          </Text>
          <S.ButtonStyled
            onPress={() => uploadeImage()}
            style={{ height: 132 /*borderRadius: 10*/, marginBottom: 6 }}
            borderRadius={10}
          >
            <Image
              source={
                userInfo.studentIdImageUrl === ''
                  ? require('../../../../assets/images/photo.png')
                  : { uri: userInfo.studentIdImageUrl }
              }
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
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', height: '13%' }}>
          <TouchableOpacity onPress={movePage()}>
            <Image source={prevButton} />
          </TouchableOpacity>
          {/* {userInfo.schoolName === '' || userInfo.studentIdImageUrl === '' ? (
            <Image source={notYetNextButton} />
          ) : (
            <TouchableOpacity onPress={movePage('emailAuth')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          )} */}
          <TouchableOpacity onPress={movePage('emailAuth')}>
            <Image source={nextButton} />
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default SchoolStudentID;
