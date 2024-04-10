import React, { useState } from 'react';
import { ISendPostcardModalProps } from './SendPostcardModal.types';
import * as S from './SendPostcardModal.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { icons } from '../../../commons/utils/variablesImages';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';

export const SendPostcardModal: React.FC<ISendPostcardModalProps> = ({ props: books }) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentPressedQuestion, setCurrentPressedQuestion] = useState<number>(0);
  const [isQuizSection, setIsQuizSection] = useState<boolean>(true);

  const answerAlphabetIndex = ['A', 'B', 'C', 'D', 'E'];

  const moveNextQuiz = () => {
    setCurrentQuizIndex(currentQuizIndex + 1);
    setCurrentPressedQuestion(0);

    if (currentQuizIndex + 1 >= books.length) {
      setIsQuizSection(false);
    }
  };

  const movePreviousQuiz = () => {
    setCurrentQuizIndex(currentQuizIndex - 1);
  };

  const selectAnswer = (questionId: number) => {
    setCurrentPressedQuestion(questionId);
  };

  return (
    <S.SendPostcardModalContainer>
      {isQuizSection ? (
        <>
          <S.BookInfoContainer>
            <S.BookWrapper>
              <S.BookImage source={{ uri: books[currentQuizIndex].bookImageUrl }} />
            </S.BookWrapper>
            <S.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
                {books[currentQuizIndex].bookName}
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#616C90">
                {books[currentQuizIndex].bookAuthors.join(', ')}
              </CustomText>
            </S.BookTitleWrapper>
          </S.BookInfoContainer>
          <S.DashLine />
          <S.BookQuizContainer>
            <S.BookQuizTitleWrapper>
              <CustomText font="fontMedium" size="16px" color="black">
                {books[currentQuizIndex].bookQuiz.title}
              </CustomText>
            </S.BookQuizTitleWrapper>
            {books[currentQuizIndex].bookQuiz.questions.map((question, index) => (
              <TouchableOpacity onPress={() => selectAnswer(question.id)}>
                <S.BookQuizInfoView key={question.id}>
                  <S.QuizCircle
                    style={{
                      backgroundColor: currentPressedQuestion === question.id ? '#AFDFF8' : colors.buttonPrimary,
                    }}
                  >
                    <S.QuizCircleText>{answerAlphabetIndex[index]}</S.QuizCircleText>
                  </S.QuizCircle>
                  <S.BookQuizAnswerWrapper>
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="12px" color="black">
                        {question.text}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  </S.BookQuizAnswerWrapper>
                </S.BookQuizInfoView>
              </TouchableOpacity>
            ))}
          </S.BookQuizContainer>
          <S.BottomButtonContainer isSingle={currentQuizIndex === 0}>
            {currentQuizIndex !== 0 && (
              <TouchableOpacity onPress={movePreviousQuiz}>
                <S.BottomArrowButton source={icons.leftArrow} />
              </TouchableOpacity>
            )}
            {currentPressedQuestion ? (
              <TouchableOpacity onPress={moveNextQuiz}>
                <S.BottomArrowButton source={icons.rightArrow} />
              </TouchableOpacity>
            ) : (
              <S.BottomArrowButton source={icons.disableRightArrow} />
            )}
          </S.BottomButtonContainer>
        </>
      ) : (
        <></>
      )}
    </S.SendPostcardModalContainer>
  );
};
