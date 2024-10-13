import manIcon from '@assets/images/icons/ManSmall.png';
import reportIcon from '@assets/images/icons/ReportIcon.png';
import settingIcon from '@assets/images/icons/Setting.png';
import womanIcon from '@assets/images/icons/WomanSmall.png';
import { uploadImageToS3 } from '@commons/api/image/imageUploadToS3.api';
import { postMemberBlock } from '@commons/api/members/block/memberBlock.api';
import { getOnboardingStatus } from '@commons/api/modal/modal.api';
import { deleteBook, getBookInfo, getInvitationCode, validateSendPostcard } from '@commons/api/postcard/library.api';
import CustomBottomSheetModal from '@commons/components/Feedbacks/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useFetchMemberPostcard from '@commons/hooks/datas/MemberPostcard/useMemberPostcard';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { useBottomSheet } from '@commons/hooks/ui/bottomSheet/useBottomSheet';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { EStatusCode } from '@commons/types/statusCode';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import { icons, img } from '@commons/utils/ui/variablesImages/variablesImages';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { RouteProp, useFocusEffect, useIsFocused } from '@react-navigation/native';
import { useFetchLibraryInfo } from '@screens/Library/hooks/useFetchLibraryInfo';
import DeleteBookModalContent from '@screens/Library/utils/DeleteBookModalContent';
import { LibraryOnboardingModal } from '@screens/Library/utils/OnboardingModal/LibraryOnboardingModal';
import { EGender } from '@screens/Matching/Postcard/Send/SendPostcard.types';
import * as Clipboard from 'expo-clipboard';
import * as ImagePicker from 'expo-image-picker';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, SafeAreaView, TouchableOpacity, View } from 'react-native';
import uuid from 'react-native-uuid';
import * as S from './Library.styles';
import { BookItemList, TBookResponses } from './Library.types';
import { MyBookInfoModify } from './MyBookInfoModify/MyBookInfoModify';
import { TBookInfo } from './MyBookInfoModify/MyBookInfoModify.types';
import { SendPostcardModal } from './SendPostcardModal/SendPostcardModal';
import { ViewBookInfo } from './ViewBookInfo/ViewBookInfo';
import BlockModalContent from './utils/BLockModalContent';
import ReportOption from './utils/ReportOption/ReportOption';

type RootStackParamList = {
  Library: { postcardId?: number; memberId: number; isYourLibrary: boolean };
};

type LibraryRouteProp = RouteProp<RootStackParamList, 'Library'>;

type Props = {
  route: LibraryRouteProp;
};

const Library: React.FC<Props> = ({ route, navigation }) => {
  useScreenLogger();
  const { toggle: onboardingToggle, isOpen: isOnboardingOpen } = useToggle(true);
  const [isAlreadyEntry, setIsAlreadyEntry] = useState<boolean>(true);
  const { toggle, isOpen } = useToggle();
  const [selectedImage, setSelectedImage] = useState<string>('');
  const { handleCloseBottomSheet, bottomRef, handleOpenBottomSheet } = useBottomSheet();
  const reportBlockBottomSheet = useBottomSheet();
  const reportBottomSheet = useBottomSheet();
  const modifyBookModalRef = useRef<BottomSheetModal>(null);
  const viewStyleModalRef = useRef<BottomSheetModal>(null);
  const viewBookInfoModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['15%', '30%', '43%', '55%', '70%', '80%', '93%'], []);
  const reportBlockSnapPoints = useMemo(() => ['24%'], []);
  const reportSnapPoints = useMemo(() => ['78%'], []);
  //todo 추후 삭제
  const isYourLibrary = route.params?.isYourLibrary ?? false;
  // const isYourLibrary = true;
  const targetMemberId = route.params?.memberId;
  // const targetMemberId = 1;
  const [isSendPostcardModalVisible, setSendPostcardModalVisible] = useState(false);
  const [isResendPostcardModalVisible, setResendPostcardModalVisible] = useState(false);
  const [isEmptyPostcardModalVisible, setEmptyPostcardVisible] = useState(false);
  const [isInviteFriendModalVisible, setInviteFriendModalVisible] = useState(false);
  const { memberPostcard } = useFetchMemberPostcard();
  const [selectedBookId, setSelectedBookId] = useState(0);
  const [bookInfoList, setBookInfoList] = useState<TBookResponses[]>([]);
  const [bookInfo, setBookInfo] = useState<TBookInfo>();
  const [isProfileImageModificationStatus, setIsProfileImageModificationStatus] = useState<boolean>(false);
  const showToast = useToastStore((state) => state.showToast);
  const { movePage, movePageNoReference, handleReset, goBack } = useMovePage();
  const logEvent = useAnalyticsEventLogger();
  const [invitationCode, setInvitationCode] = useState('');
  const { libraryInfo, bookRows, fetchLibraryInfo } = useFetchLibraryInfo(isYourLibrary, targetMemberId);
  const [isDeleteBookModalVisible, setIsDeleteBookModalVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    const fetchOnboardingStatus = async () => {
      try {
        const res = await getOnboardingStatus();
        // @ts-ignore
        setIsAlreadyEntry(res.result.libraryOnboardingStatus);
      } catch (error) {
        console.error('Failed to fetch onboarding status:', error);
      }
    };

    fetchOnboardingStatus();
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(invitationCode);
    showToast({
      content: '친구 초대 코드가 복사되었습니다!',
    });
  };

  //todo 내서재/상대방서재 스타일 정보 Api로 받아와서 추가하기
  const setMyLibraryInfo = useCallback(async () => {
    try {
      setBookInfoList(libraryInfo?.bookResponses ?? []);

      if (libraryInfo?.profileImageUrl) {
        if (libraryInfo.profileImageStatus === 'PENDING') setIsProfileImageModificationStatus(true);
      }
    } catch (err) {
      console.error(err);
      console.error('내 서재 정보를 불러오는데 실패하였습니다.');
    }
  }, []);

  const setYourLibraryInfo = useCallback(async () => {
    try {
      setIsProfileImageModificationStatus(true);
    } catch {
      console.error('상대방 서재 정보를 불러오는데 실패하였습니다.');
    }
  }, [targetMemberId]);

  useFocusEffect(
    useCallback(() => {
      if (isYourLibrary) {
        setYourLibraryInfo();
      } else {
        setMyLibraryInfo();
      }
    }, [isYourLibrary, isFocused, libraryInfo, bookRows]),
  );

  useFocusEffect(
    useCallback(() => {
      if (isYourLibrary) {
        // 파라미터 값이 true일 때만 탭 바 숨기기
        navigation.getParent<BottomTabNavigationProp<any>>()?.setOptions({ tabBarStyle: { display: 'none' } });
      }
    }, [navigation, isYourLibrary]), // 의존성 배열에 route 파라미터 추가
  );

  const fetchBookInfo = async (memberBookId?: number) => {
    if (memberBookId) {
      const result = await getBookInfo(memberBookId);
      setBookInfo(result);
    }
  };

  const handleModifyBookModalRef = useCallback((bookMemberId?: number) => {
    if (!bookMemberId) {
      showToast({
        content: '책 정보를 불러오는데 실패하였습니다.',
      });
    }

    if (bookMemberId) {
      setSelectedBookId(bookMemberId);
      modifyBookModalRef.current?.present();
    }
  }, []);

  const handleViewStyleModalRef = useCallback(() => {
    viewStyleModalRef.current?.present();
    logEvent('view_member_style');
  }, []);

  const handleViewBookInfoModalRef = useCallback(() => {
    viewBookInfoModalRef.current?.present();
    logEvent('view_book_info', {
      targetMemberId,
      memberBookId: bookInfo?.memberBookId,
      bookTitle: bookInfo?.title,
    });
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

  const toggleInviteFriendModal = async () => {
    if (!isInviteFriendModalVisible) {
      await fetchInvitationCode();
    }

    setInviteFriendModalVisible(!isInviteFriendModalVisible);
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
      showToast({
        content: '차단에 성공했습니다. 이제 서로 보이지 않습니다.',
      });
      goBack();
    } catch (error) {
      console.error('차단 실패', error);
    }
  };
  const handleBlockClick = () => {
    //차단하기 api 호출
    CallPostMemberBlock();
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

  const processDeleteBook = async () => {
    try {
      await deleteBook(selectedBookId);
      await fetchLibraryInfo();
      await setMyLibraryInfo();
      showToast({
        content: '책이 삭제되었습니다.',
      });
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      const { code, message } = error.response.data;
      if (code === EStatusCode.MEMBER_BOOK_005 || code === EStatusCode.MEMBER_BOOK_004) {
        showToast({
          content: message,
        });
      } else {
        showToast({
          content: '알 수 없는 이유로 삭제에 실패하였습니다.',
        });
      }
    }
    toggleDeleteBookModal();
  };

  const showDeleteBookModal = async () => {
    modifyBookModalRef.current?.close();
    toggleDeleteBookModal();
  };

  const moveProductScreen = () => {
    toggleEmptyPostcardModal();
    movePageNoReference('HomeStack', { screen: 'product' });
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

  const inviteFriendModalConfig = {
    visible: isInviteFriendModalVisible,
    onClose: toggleInviteFriendModal,
  };

  const toggleDeleteBookModal = () => {
    setIsDeleteBookModalVisible(!isDeleteBookModalVisible);
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

  const fetchInvitationCode = async () => {
    const result = await getInvitationCode();
    setInvitationCode(result.invitationCode);
  };

  useHeaderControl(
    isYourLibrary
      ? {
          title: '상대 페이지',
          left: true,
          onPressLeft: movePage(),
          right: {
            image: reportIcon,
            onPress: () => reportBlockBottomSheet.handleOpenBottomSheet(),
          },
        }
      : {
          title: '마이 페이지',
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

  useAppUIManager({
    setBackgroundColor: colors.primary,
  });

  const renderRow = ({ item }: { item: BookItemList }): JSX.Element => {
    return (
      <View style={{ marginBottom: 36, backgroundColor: '#f0f0f0' }}>
        <S.BookFloorWrapper style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {item.books.map((bookItem, index) => (
            <S.BookTouchableOpacity
              key={`book-${index}`}
              disabled={bookItem.isEmpty}
              onPress={async () => {
                if (isYourLibrary) {
                  await fetchBookInfo(bookItem.book?.memberBookId);
                  handleViewBookInfoModalRef();
                } else {
                  handleModifyBookModalRef(bookItem.book?.memberBookId);
                }
              }}
            >
              {bookItem.isEmpty ? (
                <S.EmptyBookImage style={{ backgroundColor: 'transparent' }} />
              ) : (
                bookItem.book && (
                  <S.BookImage
                    source={bookItem.book.bookImageUrl ? { uri: bookItem.book.bookImageUrl } : img.prepareBookImage}
                  />
                )
              )}
            </S.BookTouchableOpacity>
          ))}
        </S.BookFloorWrapper>
        <S.BookShelvesTop />
        <S.BookShelves style={S.styles.Shadow} />
      </View>
    );
  };

  return (
    <SafeAreaView style={{ height: '100%' }}>
      <LinearGradient colors={['#1D2E61', '#5B6CA8']}>
        {!isAlreadyEntry && <LibraryOnboardingModal onClose={onboardingToggle} visible={isOnboardingOpen} />}
        <S.UserInfoContainerView>
          <S.UserInfoView>
            <TouchableOpacity onPress={movePage('modifyProfile', { profileUrl: libraryInfo?.profileImageUrl })}>
              <S.CircularImage
                source={selectedImage ? { uri: selectedImage } : { uri: libraryInfo?.profileImageUrl }}
              />
              {isProfileImageModificationStatus && !isYourLibrary && <S.OverlayImage source={icons.hourGlass} />}
              {!isYourLibrary && <S.ProfileImageModificationImage source={icons.profileImageSetting} />}
            </TouchableOpacity>

            <S.UserInfoWrapper>
              <S.UserInfoNameWrapper>
                <S.UserNameText>
                  {libraryInfo?.name} | {libraryInfo?.age}
                  <S.GenderIconStyled source={libraryInfo?.gender === EGender.MALE ? manIcon : womanIcon} />
                </S.UserNameText>

                {!isYourLibrary && (
                  <S.InviteFriendButtonWrapper>
                    <TouchableOpacity onPress={toggleInviteFriendModal}>
                      <S.InviteFriendButtonImage source={icons.inviteFriend} />
                    </TouchableOpacity>
                  </S.InviteFriendButtonWrapper>
                )}
              </S.UserInfoNameWrapper>

              <S.SchoolNameText>{libraryInfo?.school}</S.SchoolNameText>

              <S.MemberStyleList>
                <S.MemberStyleView>
                  <CustomText color={colors.textWhite} size="12px">
                    {libraryInfo?.smokeType}
                  </CustomText>
                </S.MemberStyleView>
                <S.MemberStyleView>
                  <CustomText color={colors.textWhite} size="12px">
                    {libraryInfo?.mbti}
                  </CustomText>
                </S.MemberStyleView>
                <S.MemberStyleView>
                  <CustomText color={colors.textWhite} size="12px">
                    {libraryInfo?.height}cm
                  </CustomText>
                </S.MemberStyleView>
              </S.MemberStyleList>
            </S.UserInfoWrapper>
          </S.UserInfoView>
        </S.UserInfoContainerView>

        <S.BookListContainerView>
          {isYourLibrary ? (
            <CustomText style={{ marginTop: 24 }} color="rgba(0, 0, 0, 0.5)" size="12px">
              책을 눌러 상대방의 마음을 알아보세요.
            </CustomText>
          ) : (
            <CustomText style={{ marginTop: 24 }} color="rgba(0, 0, 0, 0.5)" size="12px">
              책을 누르면 좋아하는 이유와 독서퀴즈를 수정할 수 있습니다.
            </CustomText>
          )}

          <S.BookContainer>
            <FlatList
              data={bookRows}
              renderItem={renderRow}
              keyExtractor={(_, index) => `row-${index}`}
              showsVerticalScrollIndicator
              alwaysBounceVertical={false}
              ListFooterComponent={<View style={{ height: 140 }} />}
              contentContainerStyle={{ flexGrow: 1, paddingBottom: 140 }}
            />
          </S.BookContainer>
        </S.BookListContainerView>
      </LinearGradient>
      {!isYourLibrary && (
        <TouchableOpacity style={S.styles.AddBookButton} onPress={movePage('initBookStack', { screen: 'searchBook' })}>
          <S.AddBookButton source={icons.addBook} />
        </TouchableOpacity>
      )}
      <CustomBottomSheetModal
        ref={modifyBookModalRef}
        index={5}
        snapPoints={snapPoints}
        enableContentPanningGesture={false}
      >
        <S.BookModificationBottomSheetContainer>
          <MyBookInfoModify
            memberId={memberInfo.id!}
            memberBookId={selectedBookId}
            showDeleteBookModalFunc={showDeleteBookModal}
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
      <CustomBottomSheetModal ref={reportBlockBottomSheet.bottomRef} index={0} snapPoints={reportBlockSnapPoints}>
        <S.ProfileImageBottomSheetContainer>
          <S.ProfileImageModificationButton onPress={handleReportClose} style={{ marginBottom: 13 }}>
            <CustomText size="16px" font="fontRegular">
              신고하기
            </CustomText>
          </S.ProfileImageModificationButton>
          {/*<S.ProfileImageModificationButton onPress={toggle}>*/}
          {/*  <CustomText size="16px" font="fontRegular">*/}
          {/*    차단하기*/}
          {/*  </CustomText>*/}
          {/*</S.ProfileImageModificationButton>*/}
        </S.ProfileImageBottomSheetContainer>
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={reportBottomSheet.bottomRef} index={0} snapPoints={reportSnapPoints}>
        <ReportOption bottomClose={reportBottomSheet.handleCloseBottomSheet} reportedMemberId={targetMemberId} />
      </CustomBottomSheetModal>
      <CustomBottomSheetModal ref={viewBookInfoModalRef} index={3} snapPoints={snapPoints}>
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
          memberBookIdList={libraryInfo?.bookResponses?.map((bookResponse) => bookResponse.memberBookId) || []}
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
      <CustomModal modalConfig={inviteFriendModalConfig}>
        <S.InviteFriendModalWrapper>
          <S.InviteFriendModalHeader>
            <CustomText font="fontSemiBold" size="18px">
              친구를 초대하고
            </CustomText>
            <CustomText font="fontSemiBold" size="18px" style={{ marginBottom: 16 }}>
              무료 책갈피를 받으세요!
            </CustomText>
            <S.FriendInvitationCode>
              <CustomText font="fontBold" size="32px" color="#1D2E61">
                {invitationCode}
              </CustomText>
            </S.FriendInvitationCode>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <CustomText font="fontMedium" size="14px" color="rgba(0, 0, 0, 0.5)" style={{ textAlign: 'center' }}>
                친구 초대하면 친구도 나도
                <CustomText font="fontSemiBold" size="14px" color="rgba(0, 0, 0, 0.8)">
                  {' '}
                  책갈피
                </CustomText>{' '}
                지급!{'\n'}(여자 70개, 남자 35개)
              </CustomText>
            </View>
          </S.InviteFriendModalHeader>
          <S.CopyCodeButtonWrapper>
            <S.CopyCodeButton onPress={copyToClipboard} bgColor={colors.buttonPrimary}>
              <CustomText size="14px" color={colors.textWhite}>
                코드 복사하기
              </CustomText>
            </S.CopyCodeButton>
          </S.CopyCodeButtonWrapper>
          <TouchableOpacity onPress={toggleInviteFriendModal}>
            <CustomText size="14px" color="rgba(0, 0, 0, 0.4)" style={{ textDecorationLine: 'underline' }}>
              다음에 하기
            </CustomText>
          </TouchableOpacity>
        </S.InviteFriendModalWrapper>
      </CustomModal>
      <CustomModal
        modalConfig={{
          visible: isDeleteBookModalVisible,
          onClose: toggleDeleteBookModal,
          mode: 'round',
          contents: <DeleteBookModalContent />,
          buttons: [
            { label: '삭제하기', action: processDeleteBook, bgColor: colors.buttonMain, color: 'black' },
            { label: '취소', action: toggleDeleteBookModal },
          ],
        }}
      />
    </SafeAreaView>
  );
};

export default Library;
