import { SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './Library.styles';
import settingIcon from '../../../assets/images/icons/Setting.png';
import postcardImage from '../../../assets/images/example-book.png';
import { EGender } from '../Matching/Postcard/Send/SendPostcard.types';
import manIcon from '../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../assets/images/icons/WomanSmall.png';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import { MyBookInfoModify } from './MyBookInfoModify/MyBookInfoModify';
import useHeaderControl from '../../commons/hooks/useHeaderControl';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { colors } from '../../commons/styles/variablesStyles';
import ViewStyle from './ViewStyle/ViewStyle';
import { ViewBookInfo } from './ViewBookInfo/ViewBookInfo';
import useMovePage from '../../commons/hooks/useMovePage';
import { useBottomSheet } from '../../commons/hooks/useBottomSheet';
import { usePostcardCounter } from '../../commons/store/usePostcardCounter';
import { CustomModal } from '../../commons/components/CustomModal/CustomModal';
import { SendPostcardModal } from './SendPostcardModal/SendPostcardModal';
import { IBookInfo } from './SendPostcardModal/SendPostcardModal.types';
import { uploadImageToS3 } from '../../commons/api/imageUploadToS3.api';
import useMemberStore from '../../commons/store/useMemberStore';
import { deleteBook, getMyLibraryInfo, getYourLibraryInfo } from '../../commons/api/library.api';
import { TBookResponses, TLibrary } from './Library.types';

type RootStackParamList = {
  Library: { postcardId?: number; memberId: number; isYourLibrary: boolean };
};

type LibraryRouteProp = RouteProp<RootStackParamList, 'Library'>;

type Props = {
  route: LibraryRouteProp;
};

const Library: React.FC<Props> = ({ route }) => {
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { handleCloseBottomSheet, bottomRef, handleOpenBottomSheet } = useBottomSheet();
  const modifyBookModalRef = useRef<BottomSheetModal>(null);
  const viewStyleModalRef = useRef<BottomSheetModal>(null);
  const viewBookInfoModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '50%', '70%', '88%'], []);
  const isYourLibrary = route.params?.isYourLibrary;
  const targetMemberId = route.params?.memberId;
  const postcardId = route.params?.postcardId;
  const [isSendPostcardModalVisible, setSendPostcardModalVisible] = useState(false);
  const [isEmptyPostcardModalVisible, setEmptyPostcardVisible] = useState(false);
  const postcardCounter = usePostcardCounter((state) => state.count);
  const [sendPostcardProps, setSendPostcardProps] = useState<IBookInfo[] | null>(null);
  const navigation = useNavigation();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const [libraryInfo, setLibraryInfo] = useState<TLibrary>();
  const [topFloorBookList, setTopFloorBookList] = useState<TBookResponses[]>([]);
  const [secondFloorBookList, setSecondFloorBookList] = useState<TBookResponses[]>([]);
  const [selectedBookId, setSelectedBookId] = useState(0);

  const splitBook = (bookResponseList: TBookResponses[]) => {
    const newTopFloorList: TBookResponses[] = bookResponseList.filter((bookResponse) => bookResponse.representative);
    const otherBookList: TBookResponses[] = bookResponseList.filter((bookResponse) => !bookResponse.representative);
    const newSecondFloorList: TBookResponses[] = [];

    otherBookList.forEach((bookResponse, index) => {
      if (newTopFloorList.length < 2) newTopFloorList.push(bookResponse);
      else newSecondFloorList.push(bookResponse);
    });

    setTopFloorBookList(newTopFloorList);
    setSecondFloorBookList(newSecondFloorList);
  };
  const fetchMyLibraryInfo = async () => {
    try {
      const { result } = await getMyLibraryInfo();
      setLibraryInfo(result);
      splitBook(result.bookResponses);
    } catch {
      console.error('내 서재 정보를 불러오는데 실패하였습니다.');
    }
  };

  const fetchYourLibraryInfo = async (targetMemberId: number) => {
    const { result } = await getYourLibraryInfo(targetMemberId);
    setLibraryInfo(result);
  };

  useEffect(() => {
    if (isYourLibrary) {
      fetchYourLibraryInfo(targetMemberId);
    } else {
      fetchMyLibraryInfo();
    }
  }, []);

  const { movePage, handleReset } = useMovePage();

  const handleModifyBookModalRef = useCallback((bookMemberId: number) => {
    setSelectedBookId(bookMemberId);
    modifyBookModalRef.current?.present();
  }, []);

  const handleViewStyleModalRef = useCallback(() => {
    viewStyleModalRef.current?.present();
  }, []);

  const handleViewBookInfoModalRef = useCallback(() => {
    viewBookInfoModalRef.current?.present();
  }, []);

  const toggleSendPostcardModal = () => {
    setSendPostcardModalVisible(!isSendPostcardModalVisible);
  };

  const toggleEmptyPostcardModal = () => {
    setEmptyPostcardVisible(!isEmptyPostcardModalVisible);
  };

  const handlePostcardClick = () => {
    if (postcardCounter > 0) {
      toggleSendPostcardModal();
    } else {
      console.debug('엽서 부족');
      toggleEmptyPostcardModal();
    }
  };

  const deleteBookInBookList = async () => {
    await deleteBook(selectedBookId);
    await fetchMyLibraryInfo();
    modifyBookModalRef.current?.close();
  };

  const moveProductScreen = () => {
    toggleEmptyPostcardModal();
    //@ts-ignore
    navigation.navigate('product');
  };

  const sendPostcardModalConfig = {
    visible: isSendPostcardModalVisible,
    onClose: toggleSendPostcardModal,
    mode: 'round',
    close: true,
  };

  const emptyPostcardModalConfig = {
    visible: isEmptyPostcardModalVisible,
    onClose: toggleEmptyPostcardModal,
  };

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert('갤러리에 대한 접근 권한이 필요합니다.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      await uploadImageToS3(result?.assets[0].uri, memberId);
      setSelectedImage(result?.assets[0].uri);
    }
    handleCloseBottomSheet();
  };

  useHeaderControl(
    isYourLibrary
      ? {
          title: '상대페이지',
          left: true,
          onPressLeft: movePage('receivePostcardDetail', { postcardId }),
        }
      : {
          title: '마이페이지',
          left: false,
          right: {
            image: settingIcon,
            onPress: movePage('settingStack', {
              libraryInfo,
            }),
          },
        },
    isYourLibrary ? [] : [libraryInfo],
  );

  useEffect(() => {
    setSendPostcardProps([
      {
        bookName: '나미야 잡하줨',
        bookImageUrl: 'https://image.yes24.com/Goods/8157957/XL',
        bookAuthors: ['방근호', '굿굿'],
        bookQuiz: {
          id: 111,
          title: '퀴즈1',
          answerId: 1,
          questions: [
            {
              id: 123,
              text: '달토끼',
            },
            {
              id: 234,
              text: '근호방',
            },
            {
              id: 131,
              text: '고도현',
            },
          ],
        },
      },
      {
        bookName: '두번째 책',
        bookImageUrl: 'https://www.socialfocus.co.kr/news/photo/202003/6719_10162_2027.jpg',
        bookAuthors: ['방근호', '굿굿'],
        bookQuiz: {
          id: 111,
          title: '퀴즈1',
          answerId: 1,
          questions: [
            {
              id: 123,
              text: '달토끼',
            },
            {
              id: 234,
              text: '근호방',
            },
            {
              id: 131,
              text: '고도현',
            },
          ],
        },
      },
    ]);
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <S.UserInfoContainerView>
        <S.UserInfoView>
          <S.CircularImage source={selectedImage ? { uri: selectedImage } : postcardImage} />
          {!isYourLibrary && (
            <TouchableWithoutFeedback onPress={handleOpenBottomSheet}>
              <S.ProfileImageModificationImage
                source={require('../../../assets/images/icons/ProfileImageSetting.png')}
              />
            </TouchableWithoutFeedback>
          )}

          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <S.UserNameText>
                {libraryInfo?.name} | {libraryInfo?.age}
              </S.UserNameText>
              <S.GenderIconStyled source={libraryInfo?.gender === EGender.MALE ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <S.SchoolNameText>{libraryInfo?.school}</S.SchoolNameText>
          </S.UserInfoWrapper>
        </S.UserInfoView>

        <S.ProfileHeaderButtonContainer>
          {isYourLibrary ? (
            <>
              <S.ProfileModifyButtonWrapper onPress={handleViewStyleModalRef}>
                <S.ProfileModifyButtonText>스타일 보기</S.ProfileModifyButtonText>
              </S.ProfileModifyButtonWrapper>
              <S.ProfileModifyButtonWrapper
                onPress={handlePostcardClick}
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
            {topFloorBookList.map((book) => (
              <S.BookTouchableOpacity
                key={book.memberBookId}
                onPress={() => {
                  if (isYourLibrary) {
                    handleViewBookInfoModalRef();
                  } else {
                    handleModifyBookModalRef(book.memberBookId);
                  }
                }}
              >
                <S.BookImage source={{ uri: book.bookImageUrl }} />
                {book.representative && (
                  <S.BookMarkIconImage source={require('../../../assets/images/icons/Bookmark.png')} />
                )}
              </S.BookTouchableOpacity>
            ))}
            {topFloorBookList.length === 1 && (
              <S.BookTouchableOpacity onPress={() => handleReset('initBookStack')}>
                <S.EmptyBookImage>
                  <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
                </S.EmptyBookImage>
              </S.BookTouchableOpacity>
            )}
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
        <S.BookContainer>
          <S.ModalBookListContainer>
            {secondFloorBookList.map((book) => (
              <S.BookTouchableOpacity
                key={book.memberBookId}
                onPress={() => {
                  if (isYourLibrary) {
                    handleViewBookInfoModalRef();
                  } else {
                    handleModifyBookModalRef(book.memberBookId);
                  }
                }}
              >
                <S.BookImage source={{ uri: book.bookImageUrl }} />
              </S.BookTouchableOpacity>
            ))}
            {topFloorBookList.length === 2 && secondFloorBookList.length === 0 && (
              <>
                <S.BookTouchableOpacity
                  onPress={
                    secondFloorBookList ? movePage('initBookStack', { screen: 'addBook', isModify: true }) : () => {}
                  }
                >
                  <S.EmptyBookImage>
                    <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
                  </S.EmptyBookImage>
                </S.BookTouchableOpacity>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }}></S.EmptyBookImage>
                </S.BookTouchableOpacity>
              </>
            )}
            {topFloorBookList.length === 2 && secondFloorBookList.length === 1 && (
              <>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }}></S.EmptyBookImage>
                </S.BookTouchableOpacity>
              </>
            )}
            {topFloorBookList.length !== 2 && (
              <>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }}></S.EmptyBookImage>
                </S.BookTouchableOpacity>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }}></S.EmptyBookImage>
                </S.BookTouchableOpacity>
              </>
            )}
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
      </S.BookListContainerView>

      <CustomBottomSheetModal ref={modifyBookModalRef} index={4} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <MyBookInfoModify memberId={memberId} memberBookId={selectedBookId} deleteBookFunc={deleteBookInBookList} />
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

      {sendPostcardProps && (
        <CustomModal modalConfig={sendPostcardModalConfig}>
          <SendPostcardModal
            postcardInfos={[
              {
                id: 1,
                imageUrl:
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-Kon85L5WZLubsh6MZ-9XjDcci-19OYmxHOa2HM6mMA&s',
              },
              {
                id: 2,
                imageUrl:
                  'https://youthpress.net/xe/files/attach/images/9794/110/374/3df640717098f1dfdf5110ca29a64536.jpg',
              },
            ]}
            personalQuiz="금사빠세요?"
            bookInfos={sendPostcardProps}
          />
        </CustomModal>
      )}
      <CustomModal modalConfig={emptyPostcardModalConfig}>
        <S.EmptyPostcardModalWrapper>
          <S.EmptyPostcardModalHeader>
            <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
              엽서가 부족합니다.
            </CustomText>
            <CustomText font="fontRegular" size="12px">
              엽서가 부족합니다. 다음 충전 시간을 확인해 보세요.
            </CustomText>
          </S.EmptyPostcardModalHeader>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleEmptyPostcardModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                아니요
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={moveProductScreen} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                충전시간 확인하기
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>
    </SafeAreaView>
  );
};

export default Library;
