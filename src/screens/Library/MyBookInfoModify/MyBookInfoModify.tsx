import { getBookInfo, getBookQuizInfo, updateBookReview, updateQuiz } from '@commons/api/postcard/library.api';
import { DashDividerLine } from '@commons/components/Utils/DashDividerLine/DashDividerLine';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { useLimitTextLine } from '@commons/hooks/utils/limitTextLine/useLimitTextLine';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from './MyBookInfoModify.styles';
import { BookQuizQuestionInputBox, BookQuizQuestionWrapper } from './MyBookInfoModify.styles';
import { IMyBookInfoModifyProps, TBookInfo } from './MyBookInfoModify.types';

export const MyBookInfoModify: React.FC<IMyBookInfoModifyProps> = ({
  memberId,
  memberBookId,
  showDeleteBookModalFunc,
}) => {
  const { handleLimitTextLine } = useLimitTextLine();
  //todo props 정의하기
  const [bookReviewText, onChangeBookReviewText] = useState('한 줄로 독서 감상문이 들어갈 자리입니다.');
  const [bookQuizText, onChangeBookQuizText] = useState<string>('한 줄로 독서 퀴즈가 들어갈 자리입니다.');
  const [bookQuizFirstAnswerText, onChangeBookQuizFirstAnswerText] = useState('첫 번째 답이 들어갈 자리입니다.');
  const [bookQuizSecondAnswerText, onChangeBookQuizSecondAnswerText] = useState('두 번째 답이 들어갈 자리입니다.');
  const [bookQuizThirdAnswerText, onChangeBookQuizThirdAnswerText] = useState('세 번째 답이 들어갈 자리입니다.');
  const [isModifiableBookReview, setIsModifiableBookReview] = useState(false);
  const [isModifiableBookQuestion, setIsModifiableBookQuestion] = useState(false);
  const [bookInfo, setBookInfo] = useState<TBookInfo>();
  const [bookImageUrl, setBookImageUrl] = useState<string>();
  const showToast = useToastStore((state) => state.showToast);

  const isEmptyReview = () => {
    if (!bookReviewText) {
      showToast({ content: '이 책을 좋아하는 이유를 입력해주세요!' });
      return true;
    }

    return false;
  };

  const isEmptyQuiz = () => {
    if (!bookQuizText) {
      showToast({ content: '독서 퀴즈의 문제를 입력해주세요!' });
      return true;
    }

    if (!bookQuizFirstAnswerText) {
      showToast({ content: '독서 퀴즈의 첫번째 답을 입력해주세요!' });
      return true;
    }

    if (!bookQuizSecondAnswerText) {
      showToast({ content: '독서 퀴즈의 두번쨰 답을 입력해주세요!' });
      return true;
    }

    if (!bookQuizThirdAnswerText) {
      showToast({ content: '독서 퀴즈의 세번째 답을 입력해주세요!' });
      return true;
    }

    return false;
  };

  const putQuizInfo = async () => {
    if (!isEmptyQuiz()) {
      try {
        await updateQuiz({
          memberBookId,
          quiz: bookQuizText,
          quizAnswer: bookQuizFirstAnswerText,
          firstWrongChoice: bookQuizSecondAnswerText,
          secondWrongChoice: bookQuizThirdAnswerText,
        });
        showToast({ content: '독서 퀴즈가 변경되었습니다.' });
      } catch (err) {
        console.error('업데이트에 실패하였습니다.', err);
      }
    }
  };

  const patchBookReview = async () => {
    if (!isEmptyReview()) {
      try {
        await updateBookReview({
          memberBookId,
          contents: bookReviewText,
        });
        showToast({ content: '이 책을 좋아하는 이유가 변경되었습니다.' });
      } catch (err) {
        console.error('업데이트에 실패하였습니다.', err);
      }
    }
  };

  const handleOnModifyBookReview = async (status: boolean) => {
    setIsModifiableBookReview(status);
    if (!status) await patchBookReview();
  };

  const handleOnModifyBookQuestion = async (status: boolean) => {
    setIsModifiableBookQuestion(status);
    if (!status) await putQuizInfo();
  };

  const fetchBookQuiz = async (memberBookId: number) => {
    const response = await getBookQuizInfo(memberBookId);
    onChangeBookQuizText(response.quiz);
    onChangeBookQuizFirstAnswerText(response.firstChoice);
    onChangeBookQuizSecondAnswerText(response.secondChoice);
    onChangeBookQuizThirdAnswerText(response.thirdChoice);
    onChangeBookReviewText(response.review);
  };

  const fetchBookInfo = async (memberBookId: number) => {
    const response = await getBookInfo(memberBookId);
    setBookInfo(response);
    setBookImageUrl(response.imageUrl);
  };

  useEffect(() => {
    fetchBookInfo(memberBookId);
    fetchBookQuiz(memberBookId);
  }, []);

  const onChangeBookReview = (text: string) => {
    handleLimitTextLine(text, onChangeBookReviewText, 4);
  };
  const onChangeBookQuiz = (text: string) => {
    handleLimitTextLine(text, onChangeBookQuizText, 2);
  };
  const onChangeBookAnswer = (text: string, index: number) => {
    switch (index) {
      case 1:
        handleLimitTextLine(text, onChangeBookQuizFirstAnswerText, 1);
        break;
      case 2:
        handleLimitTextLine(text, onChangeBookQuizSecondAnswerText, 1);
        break;
      case 3:
        handleLimitTextLine(text, onChangeBookQuizThirdAnswerText, 1);
        break;
    }
  };

  return (
    <>
      <KeyboardAwareScrollView
        enableOnAndroid
        keyboardShouldPersistTaps="handled"
        alwaysBounceVertical={false}
        contentContainerStyle={{ flexGrow: 1, paddingBottom: 120 }}
      >
        <View style={{ padding: 16, marginHorizontal: 8, marginBottom: 30, marginTop: 4 }}>
          <S.BookInfoContainer>
            <S.BookWrapper>
              <S.BookImage source={bookImageUrl ? { uri: bookImageUrl } : img.prepareBookImage} />
            </S.BookWrapper>
            <S.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
                {bookInfo?.title}
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#616C90">
                {bookInfo?.authors?.join(', ')}
              </CustomText>
            </S.BookTitleWrapper>
          </S.BookInfoContainer>
          <DashDividerLine width={100} margin={20} />
          <S.BookReviewContainer>
            <S.BookReviewHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                이 책을 좋아하는 이유
              </CustomText>
              {isModifiableBookReview ? (
                <S.ModifyButton onPress={async () => await handleOnModifyBookReview(false)}>
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정완료
                  </CustomText>
                </S.ModifyButton>
              ) : (
                <S.ModifyButton
                  style={{ backgroundColor: '#F0E7CF' }}
                  onPress={async () => await handleOnModifyBookReview(true)}
                >
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정
                  </CustomText>
                </S.ModifyButton>
              )}
            </S.BookReviewHeaderWrapper>
            {isModifiableBookReview ? (
              <S.BookReviewInputBox
                editable
                multiline
                // numberOfLines={4}
                maxLength={100}
                inputMode="text"
                placeholder={
                  '이 책에서 인상 깊었던 내용과\n인상 깊었던 이유를 알려주세요!\n부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.'
                }
                placeholderTextColor={colors.textGray2}
                textAlignVertical="top"
                onChangeText={(text: string) => onChangeBookReview(text)}
                style={{ backgroundColor: '#F5F0E2' }}
                value={bookReviewText}
                scrollEnabled
              />
            ) : (
              <S.BookReviewWrapper>
                <CustomText font="fontMedium" size="14px" color="black">
                  {bookReviewText}
                </CustomText>
              </S.BookReviewWrapper>
            )}
            <S.BookReviewLengthView>
              <CustomText font="fontMedium" size="10px" color={colors.textGray3}>
                {bookReviewText?.length ?? 0}/100자
              </CustomText>
            </S.BookReviewLengthView>
          </S.BookReviewContainer>
          <DashDividerLine width={100} margin={20} />
          <S.BookQuizContainer>
            <S.BookQuizHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                독서 퀴즈
              </CustomText>
              {isModifiableBookQuestion ? (
                <S.ModifyButton onPress={() => handleOnModifyBookQuestion(false)}>
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정완료
                  </CustomText>
                </S.ModifyButton>
              ) : (
                <S.ModifyButton style={{ backgroundColor: '#F0E7CF' }} onPress={() => handleOnModifyBookQuestion(true)}>
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정
                  </CustomText>
                </S.ModifyButton>
              )}
            </S.BookQuizHeaderWrapper>
            {isModifiableBookQuestion ? (
              <BookQuizQuestionInputBox
                editable
                multiline
                // numberOfLines={2}
                maxLength={21}
                inputMode="text"
                placeholder="독서 퀴즈가 들어갈 자리입니다."
                placeholderTextColor={colors.textGray2}
                onChangeText={(text: string) => onChangeBookQuiz(text)}
                textAlignVertical="top"
                value={bookQuizText}
                scrollEnabled
              />
            ) : (
              <BookQuizQuestionWrapper>
                <CustomText font="fontMedium" size="14px" color="black" weight="bold">
                  {bookQuizText}
                </CustomText>
              </BookQuizQuestionWrapper>
            )}
            <S.BookQuizAnswerContainer>
              <S.BookQuizInfoView>
                <S.QuizCircle isCorrect>
                  <S.QuizCircleText>A</S.QuizCircleText>
                </S.QuizCircle>
                <S.BookQuizAnswerWrapper>
                  {isModifiableBookQuestion ? (
                    <S.BookQuizAnswerInputBox
                      editable
                      // numberOfLines={1}
                      maxLength={21}
                      inputMode="text"
                      placeholder="정답이 들어갈 영역입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: string) => onChangeBookAnswer(text, 1)}
                      textAlignVertical="center"
                      value={bookQuizFirstAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black" numberOfLines={1} ellipsizeMode="tail">
                        {bookQuizFirstAnswerText}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  )}
                </S.BookQuizAnswerWrapper>
              </S.BookQuizInfoView>
              <S.BookQuizInfoView>
                <S.QuizCircle isCorrect={false}>
                  <S.QuizCircleText>B</S.QuizCircleText>
                </S.QuizCircle>
                <S.BookQuizAnswerWrapper>
                  {isModifiableBookQuestion ? (
                    <S.BookQuizAnswerInputBox
                      editable
                      // numberOfLines={1}
                      maxLength={21}
                      inputMode="text"
                      placeholder="오답이 들어갈 자리입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: string) => onChangeBookAnswer(text, 2)}
                      textAlignVertical="center"
                      value={bookQuizSecondAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black" numberOfLines={1} ellipsizeMode="tail">
                        {bookQuizSecondAnswerText}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  )}
                </S.BookQuizAnswerWrapper>
              </S.BookQuizInfoView>
              <S.BookQuizInfoView>
                <S.QuizCircle isCorrect={false}>
                  <S.QuizCircleText>C</S.QuizCircleText>
                </S.QuizCircle>
                <S.BookQuizAnswerWrapper>
                  {isModifiableBookQuestion ? (
                    <S.BookQuizAnswerInputBox
                      editable
                      // numberOfLines={1}
                      maxLength={21}
                      inputMode="text"
                      placeholder="오답이 들어갈 영역입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: string) => onChangeBookAnswer(text, 3)}
                      textAlignVertical="center"
                      value={bookQuizThirdAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black" numberOfLines={1} ellipsizeMode="tail">
                        {bookQuizThirdAnswerText}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  )}
                </S.BookQuizAnswerWrapper>
              </S.BookQuizInfoView>
            </S.BookQuizAnswerContainer>
            <View style={{ width: '100%', alignItems: 'center', marginBottom: 5 }}>
              {isModifiableBookQuestion && (
                <CustomText font="fontRegular" size="10px" color={colors.textGray2}>
                  *부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다.
                </CustomText>
              )}
            </View>
          </S.BookQuizContainer>
          <S.BookRemoveButton onPress={showDeleteBookModalFunc}>
            <CustomText font="fontMedium" size="14px" color="white">
              서재에서 책 삭제하기
            </CustomText>
          </S.BookRemoveButton>
        </View>
      </KeyboardAwareScrollView>
    </>
  );
};
