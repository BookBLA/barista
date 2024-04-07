import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useMemo, useRef, useState } from 'react';
import useManageMargin from '../../commons/hooks/useManageMargin';
import * as S from './Library.styles';
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
import { RouteProp } from '@react-navigation/native';
import { colors } from '../../commons/styles/variablesStyles';
import ViewStyle from './ViewStyle/ViewStyle';
import { ViewBookInfo } from './ViewBookInfo/ViewBookInfo';
import useMovePage from '../../commons/hooks/useMovePage';
import { useBottomSheet } from '../../commons/hooks/useBottomSheet';

type RootStackParamList = {
  Library: { isYourLibrary: boolean };
};

type LibraryRouteProp = RouteProp<RootStackParamList, 'Library'>;

type Props = {
  route: LibraryRouteProp;
};

const Library: React.FC<Props> = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { handleCloseBottomSheet, bottomRef, handleOpenBottomSheet } = useBottomSheet();
  // const modifyProfileImageModalRef = useRef<BottomSheetModal>(null);
  const modifyBookModalRef = useRef<BottomSheetModal>(null);
  const addBookModalRef = useRef<BottomSheetModal>(null);
  const viewStyleModalRef = useRef<BottomSheetModal>(null);
  const viewBookInfoModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '50%', '70%', '88%'], []);
  const isYourLibrary = route.params?.isYourLibrary;

  const { movePage } = useMovePage();

  useHeaderControl(
    isYourLibrary
      ? {
          title: '상대페이지',
          left: true,
        }
      : {
          title: '마이페이지',
          left: false,
          right: {
            image: settingIcon,
            onPress: movePage('settingStack'),
          },
        },
  );

  const handleModifyBookModalRef = useCallback(() => {
    modifyBookModalRef.current?.present();
  }, []);

  // const handleModifyProfileImageModalRef = useCallback(() => {
  //   modifyProfileImageModalRef.current?.present();
  // }, []);

  const handleViewStyleModalRef = useCallback(() => {
    viewStyleModalRef.current?.present();
  }, []);

  const handleViewBookInfoModalRef = useCallback(() => {
    viewBookInfoModalRef.current?.present();
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
    handleCloseBottomSheet(); //바텀시트 닫음
    //todo 업로드 로직 추가
  };

  useManageMargin();

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <S.UserInfoContainerView>
        <S.UserInfoView>
          <S.CircularImage source={selectedImage ? { uri: selectedImage } : postcardImage} resizeMode="contain" />
          {!isYourLibrary && (
            <TouchableWithoutFeedback onPress={handleOpenBottomSheet}>
              <S.ProfileImageModificationImage
                source={require('../../../assets/images/icons/ProfileImageSetting.png')}
              />
            </TouchableWithoutFeedback>
          )}

          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>방근호 | 21</S.UserNameText>
              <S.GenderIconStyled source={EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>가천대</S.SchoolNameText>
          </S.UserInfoWrapper>
        </S.UserInfoView>

        <S.ProfileHeaderButtonContainer>
          {isYourLibrary ? (
            <>
              <S.ProfileModifyButtonWrapper onPress={handleViewStyleModalRef}>
                <S.ProfileModifyButtonText>스타일 보기</S.ProfileModifyButtonText>
              </S.ProfileModifyButtonWrapper>
              <S.ProfileModifyButtonWrapper
                onPress={handleViewBookInfoModalRef}
                style={{ backgroundColor: colors.buttonPrimary }}
              >
                <S.ProfileModifyButtonText style={{ color: colors.textYellow }}>엽서 보내기</S.ProfileModifyButtonText>
              </S.ProfileModifyButtonWrapper>
            </>
          ) : (
            <S.ProfileModifyButtonWrapper onPress={movePage('modifyStyle')}>
              <S.ProfileModifyButtonText>프로필 수정</S.ProfileModifyButtonText>
            </S.ProfileModifyButtonWrapper>
          )}
        </S.ProfileHeaderButtonContainer>
      </S.UserInfoContainerView>

      <S.BookListContainerView>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity onPress={isYourLibrary ? handleViewBookInfoModalRef : handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
              <S.BookMarkIconImage source={require('../../../assets/images/icons/Bookmark.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity onPress={isYourLibrary ? handleViewBookInfoModalRef : handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
        <S.BookContainer>
          <S.ModalBookListContainer>
            <S.BookTouchableOpacity onPress={isYourLibrary ? handleViewBookInfoModalRef : handleModifyBookModalRef}>
              <S.BookImage source={require('../../../assets/images/example-book.png')} />
            </S.BookTouchableOpacity>
            <S.BookTouchableOpacity onPress={movePage('modifyUserinfo')}>
              <S.EmptyBookImage>
                <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
              </S.EmptyBookImage>
            </S.BookTouchableOpacity>
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
      </S.BookListContainerView>
      <CustomBottomSheetModal ref={modifyBookModalRef} index={4} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <MyBookInfoModify bookId={123} />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={bottomRef} index={0} snapPoints={snapPoints}>
        <S.ProfileImageBottomSheetContainer>
          <S.ProfileImageModificationButton onPress={openImagePickerAsync}>
            <CustomText size="16px" font="fontRegular">
              앨범에서 사진 선택
            </CustomText>
          </S.ProfileImageModificationButton>
        </S.ProfileImageBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={viewStyleModalRef} index={3} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <ViewStyle
            styles={['테스트1', '테스트2', '테스트3']}
            friendPreferenceType="남사친여사친"
            personalQuestion="테스트 개인 질문"
          />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={viewBookInfoModalRef} index={2} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <ViewBookInfo
            bookName="카와카츠 맛있겠다."
            bookAuthors={['샤브샤브']}
            bookImageUrl="https://source.unsplash.com/random/300×300"
            bookReview="한 줄로 감상문이 들어갈 자리입니다."
          />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>
    </SafeAreaView>
  );
};

export default Library;
