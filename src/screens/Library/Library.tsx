import { Platform, SafeAreaView, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as S from './Library.styles';
import settingIcon from '../../../assets/images/icons/Setting.png';
import manIcon from '../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../assets/images/icons/WomanSmall.png';
import reportIcon from '../../../assets/images/icons/ReportIcon.png';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import * as ImagePicker from 'expo-image-picker';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import { MyBookInfoModify } from './MyBookInfoModify/MyBookInfoModify';
import useHeaderControl from '../../commons/hooks/useHeaderControl';
import { RouteProp, useFocusEffect } from '@react-navigation/native';
import { colors } from '../../commons/styles/variablesStyles';
import ViewStyle from './ViewStyle/ViewStyle';
import { ViewBookInfo } from './ViewBookInfo/ViewBookInfo';
import useMovePage from '../../commons/hooks/useMovePage';
import { useBottomSheet } from '../../commons/hooks/useBottomSheet';
import { CustomModal } from '../../commons/components/CustomModal/CustomModal';
import { SendPostcardModal } from './SendPostcardModal/SendPostcardModal';
import { uploadImageToS3 } from '../../commons/api/imageUploadToS3.api';
import uuid from 'react-native-uuid';
import useMemberStore from '../../commons/store/useMemberStore';
import {
  deleteBook,
  getBookInfo,
  getMemberStyle,
  getMyLibraryInfo,
  getYourLibraryInfo,
  validateSendPostcard,
} from '../../commons/api/library.api';
import { TBookResponses, TLibrary } from './Library.types';
import { TBookInfo, TMemberStyleInfo } from './MyBookInfoModify/MyBookInfoModify.types';
import useFetchMemberPostcard from '../../commons/hooks/useMemberPostcard';
import useToastStore from '../../commons/store/useToastStore';
import { EGender } from '../Matching/Postcard/Send/SendPostcard.types';
import { useUserStore } from '../../commons/store/useUserinfo';
import { icons, img } from '../../commons/utils/variablesImages';
import { isAxiosErrorResponse } from '../../commons/utils/isAxiosErrorResponse';
import { EStatusCode } from '../../commons/types/statusCode';
import { useToggle } from '../../commons/hooks/useToggle';
import ReportOption from './utils/ReportOption/ReportOption';
import BlockModalContent from './utils/BLockModalContent';
import { postMemberBlock } from '../../commons/api/memberBlock.api';

type RootStackParamList = {
  Library: { postcardId?: number; memberId: number; isYourLibrary: boolean };
};

type LibraryRouteProp = RouteProp<RootStackParamList, 'Library'>;

type Props = {
  route: LibraryRouteProp;
};

const Library: React.FC<Props> = ({ route }) => {
  const { toggle, isOpen } = useToggle();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { handleCloseBottomSheet, bottomRef, handleOpenBottomSheet } = useBottomSheet();
  const reportBlockBottomSheet = useBottomSheet();
  const reportBottomSheet = useBottomSheet();
  const modifyBookModalRef = useRef<BottomSheetModal>(null);
  const viewStyleModalRef = useRef<BottomSheetModal>(null);
  const viewBookInfoModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '50%', '70%', '93%'], []);
  const reportSnapPoints = useMemo(() => ['23%'], []);
  //todo 추후 삭제
  const isYourLibrary = route.params?.isYourLibrary;
  // const isYourLibrary = true;
  const targetMemberId = route.params?.memberId;
  // const targetMemberId = 4;
  const postcardId = route.params?.postcardId;
  const [isSendPostcardModalVisible, setSendPostcardModalVisible] = useState(false);
  const [isResendPostcardModalVisible, setResendPostcardModalVisible] = useState(false);
  const [isEmptyPostcardModalVisible, setEmptyPostcardVisible] = useState(false);
  const { memberPostcard } = useFetchMemberPostcard();
  const [libraryInfo, setLibraryInfo] = useState<TLibrary>();
  const [topFloorBookList, setTopFloorBookList] = useState<TBookResponses[]>([]);
  const [secondFloorBookList, setSecondFloorBookList] = useState<TBookResponses[]>([]);
  const [selectedBookId, setSelectedBookId] = useState(0);
  const [bookInfo, setBookInfo] = useState<TBookInfo>();
  const [memberStyle, setMemberStyle] = useState<TMemberStyleInfo>();
  const [isProfileImageModificationStatus, setIsProfileImageModificationStatus] = useState<boolean>(false);
  const showToast = useToastStore((state) => state.showToast);
  const platformBlurRadius = Platform.select({
    ios: isProfileImageModificationStatus ? 9 : 0,
    android: isProfileImageModificationStatus ? 30 : 0,
  });
  const { movePage, movePageNoReference, handleReset } = useMovePage();

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

  const fetchMyLibraryInfo = useCallback(async () => {
    try {
      const { result } = await getMyLibraryInfo();
      setLibraryInfo(result);
      splitBook(result.bookResponses);

      if (result.profileImageUrl) {
        if (result.profileImageStatus === 'PENDING') setIsProfileImageModificationStatus(true);
      }
    } catch {
      console.error('내 서재 정보를 불러오는데 실패하였습니다.');
    }
  }, []);

  const fetchYourLibraryInfo = useCallback(async () => {
    try {
      const result = await getYourLibraryInfo(targetMemberId);
      setLibraryInfo(result);
      splitBook(result.bookResponses);
      setIsProfileImageModificationStatus(true);
    } catch {
      console.error('상대방 서재 정보를 불러오는데 실패하였습니다.');
    }
  }, [targetMemberId]);

  useEffect(() => {
    if (isYourLibrary) {
      fetchYourLibraryInfo();
    } else {
      fetchMyLibraryInfo();
    }
  }, [fetchMyLibraryInfo, fetchYourLibraryInfo, isYourLibrary]);

  useFocusEffect(
    useCallback(() => {
      if (isYourLibrary) {
        fetchYourLibraryInfo();
      } else {
        fetchMyLibraryInfo();
      }
    }, [fetchMyLibraryInfo, fetchYourLibraryInfo, isYourLibrary]),
  );

  const fetchBookInfo = async (memberBookId: number) => {
    const result = await getBookInfo(memberBookId);
    setBookInfo(result);
  };

  const fetchTargetMemberStyle = async (targetMemberId: number) => {
    const result = await getMemberStyle(targetMemberId);
    setMemberStyle(result);
  };

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

  const toggleResendPostcardModal = () => {
    setResendPostcardModalVisible(!isResendPostcardModalVisible);
  };

  const toggleEmptyPostcardModal = () => {
    setEmptyPostcardVisible(!isEmptyPostcardModalVisible);
  };

  const getCurrentPostcardStatus = async () => {
    return await validateSendPostcard(targetMemberId);
  };

  const handleReportClose = () => {
    reportBottomSheet.handleOpenBottomSheet();
    reportBlockBottomSheet.handleCloseBottomSheet();
  };

  const CallPostMemberBlock = async () => {
    try {
      const response = await postMemberBlock(targetMemberId);
      console.log('차단 성공');
      showToast({
        content: '차단에 성공했습니다. 이제 서로 보이지 않습니다.',
      });
    } catch (error) {
      console.log('차단 실패');
    }
  };
  const handleBlockClick = () => {
    //차단하기 api 호출
    CallPostMemberBlock;
    toggle();
    reportBlockBottomSheet.handleCloseBottomSheet();
  };

  const handlePostcardClick = async () => {
    const validateResult = await getCurrentPostcardStatus();

    if (!validateResult?.isSuccess) {
      showToast({
        content: validateResult?.rejectMessage!,
      });
      return;
    }

    if (validateResult?.isSuccess && validateResult.isRefused) {
      toggleResendPostcardModal();
      return;
    }

    if (validateResult?.isSuccess && !validateResult.isRefused) {
      handleOpenPostcardModal();
    }
  };

  const handleOpenPostcardModal = async () => {
    if (isResendPostcardModalVisible) {
      toggleResendPostcardModal();
    }

    if (memberPostcard > 0) {
      toggleSendPostcardModal();
    } else {
      toggleEmptyPostcardModal();
    }
  };

  const deleteBookInBookList = async () => {
    try {
      await deleteBook(selectedBookId);
      await fetchMyLibraryInfo();
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      const { code, message } = error.response.data;
      if (code === EStatusCode.MEMBER_BOOK_005) {
        showToast({
          content: message,
        });
      }
    }

    modifyBookModalRef.current?.close();
  };

  const moveProductScreen = () => {
    toggleEmptyPostcardModal();
    movePageNoReference('product');
  };

  const resendPostcardModalConfig = {
    visible: isResendPostcardModalVisible,
    onClose: toggleResendPostcardModal,
    mode: 'round',
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

  const memberInfo = useMemberStore((state) => state.memberInfo);
  const updateProfileImageUrl = useUserStore((state) => state.updateProfileImageUrl);

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
      const randomId = uuid.v4();
      const imageUrl = await uploadImageToS3(result?.assets[0].uri, randomId);
      setSelectedImage(result?.assets[0].uri);
      await updateProfileImageUrl(imageUrl ?? '');
      setIsProfileImageModificationStatus(true);
    }
    handleCloseBottomSheet();
  };

  useHeaderControl(
    isYourLibrary
      ? {
          title: '상대페이지',
          left: true,
          onPressLeft: movePage(),
          right: {
            image: reportIcon,
            onPress: () => reportBlockBottomSheet.handleOpenBottomSheet(),
          },
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

  return (
    <SafeAreaView style={{ backgroundColor: 'white', height: '100%' }}>
      <S.UserInfoContainerView>
        {isProfileImageModificationStatus && !isYourLibrary && (
          <S.UserModificationStatusBar>
            <CustomText size="14px" font="fontMedium" color="#F7F4ED">
              사진이 수정되어 승인 대기중입니다.
            </CustomText>
          </S.UserModificationStatusBar>
        )}
        <S.UserInfoView>
          <S.CircularImage
            source={selectedImage ? { uri: selectedImage } : { uri: libraryInfo?.profileImageUrl }}
            blurRadius={platformBlurRadius}
          />
          {isProfileImageModificationStatus && !isYourLibrary && <S.OverlayImage source={icons.hourGlass} />}
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
              <S.ProfileModifyButtonWrapper
                onPress={async () => {
                  await fetchTargetMemberStyle(targetMemberId);
                  handleViewStyleModalRef();
                }}
              >
                <S.ProfileModifyButtonText>스타일 보기</S.ProfileModifyButtonText>
              </S.ProfileModifyButtonWrapper>
              <S.ProfileModifyButtonWrapper
                onPress={async () => {
                  await handlePostcardClick();
                }}
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
                onPress={async () => {
                  if (isYourLibrary) {
                    await fetchBookInfo(book.memberBookId);
                    handleViewBookInfoModalRef();
                  } else {
                    handleModifyBookModalRef(book.memberBookId);
                  }
                }}
              >
                <S.BookImage source={book.bookImageUrl ? { uri: book.bookImageUrl } : img.prepareBookImage} />
                {book.representative && (
                  <S.BookMarkIconImage source={require('../../../assets/images/icons/Bookmark.png')} />
                )}
              </S.BookTouchableOpacity>
            ))}
            {topFloorBookList.length === 1 &&
              (isYourLibrary ? (
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                </S.BookTouchableOpacity>
              ) : (
                <S.BookTouchableOpacity onPress={() => handleReset('initBookStack')}>
                  <S.EmptyBookImage>
                    <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
                  </S.EmptyBookImage>
                </S.BookTouchableOpacity>
              ))}
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
        <S.BookContainer>
          <S.ModalBookListContainer>
            {secondFloorBookList.map((book) => (
              <S.BookTouchableOpacity
                key={book.memberBookId}
                onPress={async () => {
                  if (isYourLibrary) {
                    await fetchBookInfo(book.memberBookId);
                    handleViewBookInfoModalRef();
                  } else {
                    handleModifyBookModalRef(book.memberBookId);
                  }
                }}
              >
                <S.BookImage source={book.bookImageUrl ? { uri: book.bookImageUrl } : img.prepareBookImage} />
              </S.BookTouchableOpacity>
            ))}
            {topFloorBookList.length === 2 && secondFloorBookList.length === 0 && (
              <>
                {isYourLibrary && (
                  <S.BookTouchableOpacity>
                    <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                  </S.BookTouchableOpacity>
                )}
                {!isYourLibrary && (
                  <S.BookTouchableOpacity
                    onPress={
                      secondFloorBookList ? movePage('initBookStack', { screen: 'addBook', isModify: true }) : () => {}
                    }
                  >
                    <S.EmptyBookImage>
                      <S.EmptyBookPlusImage source={require('../../../assets/images/icons/PlusBook.png')} />
                    </S.EmptyBookImage>
                  </S.BookTouchableOpacity>
                )}
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                </S.BookTouchableOpacity>
              </>
            )}
            {topFloorBookList.length === 2 && secondFloorBookList.length === 1 && (
              <>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                </S.BookTouchableOpacity>
              </>
            )}
            {topFloorBookList.length !== 2 && (
              <>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                </S.BookTouchableOpacity>
                <S.BookTouchableOpacity>
                  <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
                </S.BookTouchableOpacity>
              </>
            )}
          </S.ModalBookListContainer>
          <S.BookShelves style={S.styles.Shadow} />
        </S.BookContainer>
      </S.BookListContainerView>

      <CustomBottomSheetModal ref={modifyBookModalRef} index={4} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <MyBookInfoModify
            memberId={memberInfo.id}
            memberBookId={selectedBookId}
            deleteBookFunc={deleteBookInBookList}
          />
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

      <CustomBottomSheetModal ref={reportBlockBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
        <S.ProfileImageBottomSheetContainer>
          <S.ProfileImageModificationButton onPress={handleReportClose} style={{ marginBottom: 13 }}>
            <CustomText size="16px" font="fontRegular">
              신고하기
            </CustomText>
          </S.ProfileImageModificationButton>
          <S.ProfileImageModificationButton onPress={toggle}>
            <CustomText size="16px" font="fontRegular">
              차단하기
            </CustomText>
          </S.ProfileImageModificationButton>
        </S.ProfileImageBottomSheetContainer>
      </CustomBottomSheetModal>

      <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={3} snapPoints={snapPoints}>
        <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} />
      </CustomBottomSheetModal>

      <CustomBottomSheetModal ref={viewStyleModalRef} index={3} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <ViewStyle
            styles={[
              memberStyle?.dateStyleType,
              memberStyle?.dateCostType,
              memberStyle?.contactType,
              memberStyle?.drinkType,
              memberStyle?.smokeType,
              memberStyle?.mbti,
            ]}
            friendPreferenceType={memberStyle?.justFriendType}
            personalQuestion={memberStyle?.memberAsk}
          />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>

      <CustomBottomSheetModal ref={viewBookInfoModalRef} index={2} snapPoints={snapPoints}>
        <S.BookModificationBottomSheetContainer>
          <ViewBookInfo
            bookName={bookInfo?.title}
            bookAuthors={bookInfo?.authors}
            bookImageUrl={bookInfo?.imageUrl ?? img.prepareBookImage}
            bookReview={bookInfo?.review}
          />
        </S.BookModificationBottomSheetContainer>
      </CustomBottomSheetModal>

      <CustomModal modalConfig={resendPostcardModalConfig}>
        <S.EmptyPostcardModalWrapper>
          <S.EmptyPostcardModalHeader>
            <CustomText font="fontMedium" size="16px" style={{ marginBottom: 12 }}>
              엽서 다시 보내기
            </CustomText>
            <CustomText font="fontRegular" size="12px">
              이전에 매칭을 거부한 상대입니다. 그래도 보내시겠어요?
            </CustomText>
          </S.EmptyPostcardModalHeader>
          <S.ModalBottomWrapper>
            <S.RoundButton onPress={toggleResendPostcardModal} bgColor={colors.buttonMain}>
              <CustomText size="14px" color={colors.textBlack}>
                아니요
              </CustomText>
            </S.RoundButton>
            <S.RoundButton onPress={handleOpenPostcardModal} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textYellow}>
                네
              </CustomText>
            </S.RoundButton>
          </S.ModalBottomWrapper>
        </S.EmptyPostcardModalWrapper>
      </CustomModal>

      <CustomModal modalConfig={sendPostcardModalConfig}>
        <SendPostcardModal
          isVisible={isSendPostcardModalVisible}
          targetMemberId={targetMemberId}
          memberBookIdList={libraryInfo?.bookResponses.map((bookResponse) => bookResponse.memberBookId) || []}
          onClose={toggleSendPostcardModal}
        />
      </CustomModal>

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
      <CustomModal
        modalConfig={{
          visible: isOpen,
          onClose: toggle,
          mode: 'round',
          contents: <BlockModalContent />,
          buttons: [
            { label: '아니오', action: toggle, bgColor: colors.buttonMain, color: 'black' },
            { label: '차단하기', action: handleBlockClick },
          ],
        }}
      />
    </SafeAreaView>
  );
};

export default Library;
