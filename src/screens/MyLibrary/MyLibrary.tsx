import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import useManageMargin from '../../commons/hooks/useManageMargin';
import * as S from './MyLibrary.styles';
import settingIcon from '../../../assets/images/icons/Setting.png';
import postcardImage from '../../../assets/images/example-postcard.png';
import { EGender } from '../Matching/Postcard/Send/SendPostcard.types';
import manIcon from '../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../assets/images/icons/WomanSmall.png';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import { MyBookInfoModify } from './MyBookInfoModify/MyBookInfoModify';
import useHeaderControl from '../../commons/hooks/useHeaderControl';

const MyLibrary = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const modifyProfileImageModalRef = useRef<BottomSheetModal>(null);
  const modifyBookModalRef = useRef<BottomSheetModal>(null);
  const addBookModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '50%', '88%'], []);

  useHeaderControl({
    title: '마이페이지',
    left: false,
    right: {
      image: settingIcon,
      onPress: () => {
        //todo 설정여기다가 추가하시믄 됩니다.
        console.log('세팅 버튼');
      },
    },
  });

  const handleModifyBookModalRef = useCallback(() => {
    modifyBookModalRef.current?.present();
  }, []);

  const handleModifyProfileImageModalRef = useCallback(() => {
    modifyProfileImageModalRef.current?.present();
  }, []);

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('갤러리에 대한 접근 권한이 필요합니다.');
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
    //todo 업로드 로직 추가
  };

  useManageMargin();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <S.UserInfoContainerView>
        <S.UserInfoView>
          <S.CircularImage source={selectedImage ? { uri: selectedImage } : postcardImage} resizeMode="contain" />
          <TouchableWithoutFeedback onPress={handleModifyProfileImageModalRef}>
            <S.ProfileImageModificationImage source={require('../../../assets/images/icons/ProfileImageSetting.png')} />
          </TouchableWithoutFeedback>
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>방근호 | 21</S.UserNameText>
              <S.GenderIconStyled source={EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>가천대</S.SchoolNameText>
          </S.UserInfoWrapper>
        </S.UserInfoView>

        <S.ProfileModifyButtonContainer>
          <S.ProfileModifyButtonText>프로필 수정</S.ProfileModifyButtonText>
        </S.ProfileModifyButtonContainer>
      </S.UserInfoContainerView>

      <S.BookListContainerView>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity onPress={handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
              <S.BookMarkIconImage source={require('../../../assets/images/icons/Bookmark.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity onPress={handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity onPress={handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity>
              <S.EmptyBookImage>
                <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
              </S.EmptyBookImage>
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
      </S.BookListContainerView>
      <CustomBottomSheetModal ref={modifyBookModalRef} index={3} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <MyBookInfoModify bookId={123} />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={modifyProfileImageModalRef} index={0} snapPoints={snapPoints}>
        <S.ProfileImageBottomSheetContainer>
          <S.ProfileImageModificationButton onPress={openImagePickerAsync}>
            <CustomText size="16px" font="fontRegular">
              앨범에서 사진 선택
            </CustomText>
          </S.ProfileImageModificationButton>
        </S.ProfileImageBottomSheetContainer>
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
};

export default MyLibrary;
