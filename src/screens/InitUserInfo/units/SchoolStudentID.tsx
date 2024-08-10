import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { Image, Text, View, Alert, Linking, TouchableWithoutFeedback, Keyboard } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import { useUserStore } from '../../../commons/store/useUserinfo';
import uuid from 'react-native-uuid';
import { uploadStudentIdImageToS3 } from '../../../commons/api/image/imageUploadToS3.api';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import useHeaderControl from '../../../commons/hooks/useHeaderControl';
import { useToggle } from '../../../commons/hooks/useToggle';
import { CustomModal } from '../../../commons/components/CustomModal/CustomModal';
import ModalTitle from './components/searchSchool/ModalTitle';
import ModalContent from './components/searchSchool/ModalContent';
import useScreenLogger from '../../../commons/hooks/useAnalyticsScreenLogger';

const SchoolStudentID = () => {
  useHeaderControl({
    title: '정보 입력',
    left: false,
  });
  const { isOpen, toggle } = useToggle();

  useScreenLogger();
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [school, setSchool] = useState('');

  //이미지 업로드 함수
  const [imageUrl, setImageUrl] = useState(userInfo.studentIdImageUrl);
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
    updateUserInfo({ studentIdImageUrl: result?.assets[0].uri });
  };

  const moveNext = async () => {
    movePage('emailAuth')();
    if (userInfo.studentIdImageUrl !== '') {
      const uploadedFileUrl = await uploadStudentIdImageToS3(imageUrl, uuid.v4());
      if (uploadedFileUrl) {
        updateUserInfo({ studentIdImageUrl: uploadedFileUrl });
      }
    }
  };

  const selectSchool = (school: string) => {
    updateUserInfo({ schoolName: school });
    toggle();
  };

  const modalConfig = {
    title: <ModalTitle />,
    visible: isOpen,
    onClose: toggle,
    close: true,
    mode: 'round',
    contents: <ModalContent school={school} setSchool={setSchool} />,
    buttons: [{ label: '확인', action: () => selectSchool(school) }],
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={75} />
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-around' }}
        > */}
      <View style={{ width: '100%', alignItems: 'center' }}>
        <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
        <S.ButtonStyled onPress={toggle}>
          <Text
            style={{
              color: userInfo.schoolName === '' ? colors.textGray2 : colors.primary,
              fontFamily: 'fontMedium',
            }}
          >
            {userInfo.schoolName === '' ? '학교' : userInfo.schoolName}
          </Text>
        </S.ButtonStyled>
        <CustomModal modalConfig={modalConfig} />
      </View>
      <View style={{ width: '100%', alignItems: 'center' }}>
        <S.ContentStyled style={{ marginBottom: 8 }}>학생증 사진을 업로드해 주세요.</S.ContentStyled>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12 }}>
          실물 학생증 및 모바일 학생증 모두 가능합니다.
        </Text>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 12, marginBottom: 16 }}>
          실물 학생증의 경우 카드번호를 가리고 업로드해 주세요.
        </Text>
        <S.ButtonStyled onPress={() => uploadImage()} style={{ height: 132, marginBottom: 6 }} borderRadius={10}>
          <View style={imageUrl === '' ? { width: 40, height: 40.52 } : { width: 160, height: 120 }}>
            <Image
              source={
                userInfo.studentIdImageUrl === ''
                  ? require('../../../../assets/images/photo.png')
                  : { uri: userInfo.studentIdImageUrl }
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
      {/* </KeyboardAwareScrollView>
      </TouchableWithoutFeedback> */}
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {userInfo.studentIdImageUrl === '' || userInfo.schoolName === '' ? (
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
