import React, { useState } from 'react';
import { IMyBookInfoModifyProps } from './MyBookInfoModify.types';
import * as S from './MyBookInfoModify.styles';
import { BookQuizQuestionInputBox, BookQuizQuestionWrapper } from './MyBookInfoModify.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../commons/styles/variablesStyles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { ScrollView } from 'react-native';

export const MyBookInfoModify: React.FC<IMyBookInfoModifyProps> = ({ bookId }) => {
  //todo props 정의하기
  const [bookReviewText, onChangeBookReviewText] = useState('한 줄로 독서 감상문이 들어갈 자리입니다.');
  const [bookQuizText, onChangeBookQuizText] = useState('한 줄로 독서 퀴즈가 들어갈 자리입니다.');
  const [bookQuizFirstAnswerText, onChangeBookQuizFirstAnswerText] = useState('첫 번째 답이 들어갈 자리입니다.');
  const [bookQuizSecondAnswerText, onChangeBookQuizSecondAnswerText] = useState('두 번째 답이 들어갈 자리입니다.');
  const [bookQuizThirdAnswerText, onChangeBookQuizThirdAnswerText] = useState('세 번째 답이 들어갈 자리입니다.');
  const [isModifiableBookReview, setIsModifiableBookReview] = useState(false);
  const [isModifiableBookQuestion, setIsModifiableBookQuestion] = useState(false);

  const handleOnModifyBookReview = () => {
    setIsModifiableBookReview(!isModifiableBookReview);
  };

  const handleOnModifyBookQuestion = () => {
    setIsModifiableBookQuestion(!isModifiableBookQuestion);
    //todo isModifiable이 false가 되면 저장하는 api 호출
  };

  return (
    <>
      <KeyboardAwareScrollView
        extraScrollHeight={120}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        overScrollMode="never"
      >
        <ScrollView>
          <S.BookInfoContainer>
            <S.BookWrapper>
              <S.BookImage source={require('../../../../assets/images/example-book.png')} />
            </S.BookWrapper>
            <S.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
                한줄로 책 이름 들어갈 자리 한줄로 책 이름 들어갈 자리
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#616C90">
                한줄로 책 이름 들어갈 자리 한줄로
              </CustomText>
            </S.BookTitleWrapper>
          </S.BookInfoContainer>
          <S.DashLine />
          <S.BookReviewContainer>
            <S.BookReviewHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                한 줄 감상문
              </CustomText>
              {isModifiableBookReview ? (
                <S.ModifyButton onPress={handleOnModifyBookReview}>
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정완료
                  </CustomText>
                </S.ModifyButton>
              ) : (
                <S.ModifyButton style={{ backgroundColor: '#F0E7CF' }} onPress={handleOnModifyBookReview}>
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
                numberOfLines={4}
                maxLength={100}
                inputMode="text"
                placeholder="감상문을 적어주세요!"
                placeholderTextColor={colors.textGray2}
                textAlignVertical="top"
                onChangeText={(text: React.SetStateAction<string>) => onChangeBookReviewText(text)}
                style={{ backgroundColor: '#F5F0E2' }}
                value={bookReviewText}
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
                {bookReviewText.length}/100자
              </CustomText>
            </S.BookReviewLengthView>
          </S.BookReviewContainer>
          <S.DashLine />
          <S.BookQuizContainer>
            <S.BookQuizHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                독서 퀴즈
              </CustomText>
              {isModifiableBookQuestion ? (
                <S.ModifyButton onPress={handleOnModifyBookQuestion}>
                  <CustomText font="fontMedium" size="12px" color="black">
                    수정완료
                  </CustomText>
                </S.ModifyButton>
              ) : (
                <S.ModifyButton style={{ backgroundColor: '#F0E7CF' }} onPress={handleOnModifyBookQuestion}>
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
                numberOfLines={2}
                maxLength={50}
                inputMode="text"
                placeholder="독서 퀴즈가 들어갈 자리입니다."
                placeholderTextColor={colors.textGray2}
                onChangeText={(text: React.SetStateAction<string>) => onChangeBookQuizText(text)}
                textAlignVertical="top"
                value={bookQuizText}
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
                      multiline
                      numberOfLines={1}
                      maxLength={25}
                      inputMode="text"
                      placeholder="첫 번째 답이 들어갈 자리입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: React.SetStateAction<string>) => onChangeBookQuizFirstAnswerText(text)}
                      textAlignVertical="center"
                      value={bookQuizFirstAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black">
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
                      multiline
                      numberOfLines={1}
                      maxLength={25}
                      inputMode="text"
                      placeholder="두 번째 답이 들어갈 자리입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: React.SetStateAction<string>) => onChangeBookQuizSecondAnswerText(text)}
                      textAlignVertical="center"
                      value={bookQuizSecondAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black">
                        {bookQuizSecondAnswerText}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  )}
                </S.BookQuizAnswerWrapper>
              </S.BookQuizInfoView>
              <S.BookQuizInfoView>
                <S.QuizCircle isCorrect>
                  <S.QuizCircleText>C</S.QuizCircleText>
                </S.QuizCircle>
                <S.BookQuizAnswerWrapper>
                  {isModifiableBookQuestion ? (
                    <S.BookQuizAnswerInputBox
                      editable
                      multiline
                      numberOfLines={1}
                      maxLength={25}
                      inputMode="text"
                      placeholder="세 번째 답이 들어갈 자리입니다."
                      placeholderTextColor={colors.textGray2}
                      onChangeText={(text: React.SetStateAction<string>) => onChangeBookQuizThirdAnswerText(text)}
                      textAlignVertical="center"
                      value={bookQuizThirdAnswerText}
                    />
                  ) : (
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="14px" color="black">
                        {bookQuizThirdAnswerText}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  )}
                </S.BookQuizAnswerWrapper>
              </S.BookQuizInfoView>
            </S.BookQuizAnswerContainer>
          </S.BookQuizContainer>
          {/*todo 책 삭세 시 모달 종료되면서, 내 서재에서는 한 칸씩 밀려야 할듯*/}
          <S.BookRemoveButton>
            <CustomText font="fontMedium" size="14px" color="white">
              서재에서 책 삭제하기
            </CustomText>
          </S.BookRemoveButton>
        </ScrollView>
      </KeyboardAwareScrollView>
    </>
  );
};