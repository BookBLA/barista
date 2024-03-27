import React from 'react';
import { IMyBookInfoModifyProps } from './MyBookInfoModify.types';
import * as S from './MyBookInfoModify.styles';
import { BookQuizQuestionInputBox } from './MyBookInfoModify.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../commons/styles/variablesStyles';
import { ScrollView } from 'react-native';

export const MyBookInfoModify: React.FC<IMyBookInfoModifyProps> = ({ bookId }) => {
  //todo props 정의하기
  const [bookReviewText, onChangeBookReviewText] = React.useState('');
  const [bookQuizText, onChangeBookQuizText] = React.useState('');
  const [bookQuizFirstAnswerText, onChangeBookQuizFirstAnswerText] = React.useState('');
  const [bookQuizSecondAnswerText, onChangeBookQuizSecondAnswerText] = React.useState('');
  const [bookQuizThirdAnswerText, onChangeBookQuizThirdAnswerText] = React.useState('');

  return (
    <>
      <ScrollView
        keyboardShouldPersistTaps="handled"
        alwaysBounceHorizontal={false}
        automaticallyAdjustKeyboardInsets={true}
      >
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
            <S.ModifyButton>
              <CustomText font="fontMedium" size="12px" color="black">
                수정
              </CustomText>
            </S.ModifyButton>
          </S.BookReviewHeaderWrapper>
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
            value={bookReviewText}
          />
          <S.BookReviewLengthView>
            <CustomText font="fontMedium" size="10px" color={colors.textGray3}>
              {bookReviewText.length}/100
            </CustomText>
          </S.BookReviewLengthView>
        </S.BookReviewContainer>
        <S.DashLine />
        <S.BookQuizContainer>
          <S.BookQuizHeaderWrapper>
            <CustomText font="fontMedium" size="16px" color="black" weight="bold">
              독서 퀴즈
            </CustomText>
            <S.ModifyButton>
              <CustomText font="fontMedium" size="12px" color="black">
                수정
              </CustomText>
            </S.ModifyButton>
          </S.BookQuizHeaderWrapper>
          <BookQuizQuestionInputBox
            editable
            multiline
            numberOfLines={2}
            maxLength={50}
            inputMode="text"
            placeholder="독서 퀴즈 문제를 적어 주세요!"
            placeholderTextColor={colors.textGray2}
            onChangeText={(text: React.SetStateAction<string>) => onChangeBookQuizText(text)}
            textAlignVertical="top"
            value={bookQuizText}
          />
          <S.BookQuizAnswerContainer>
            <S.BookQuizInfoView>
              <S.QuizCircle isCorrect>
                <S.QuizCircleText>A</S.QuizCircleText>
              </S.QuizCircle>
              <S.BookQuizAnswerWrapper>
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
              </S.BookQuizAnswerWrapper>
            </S.BookQuizInfoView>
            <S.BookQuizInfoView>
              <S.QuizCircle isCorrect={false}>
                <S.QuizCircleText>B</S.QuizCircleText>
              </S.QuizCircle>
              <S.BookQuizAnswerWrapper>
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
              </S.BookQuizAnswerWrapper>
            </S.BookQuizInfoView>
            <S.BookQuizInfoView>
              <S.QuizCircle isCorrect>
                <S.QuizCircleText>C</S.QuizCircleText>
              </S.QuizCircle>
              <S.BookQuizAnswerWrapper>
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
    </>
  );
};
