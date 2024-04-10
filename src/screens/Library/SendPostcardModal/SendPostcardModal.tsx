import React, { useState } from 'react';
import { checkedQuizAnswer, ISendPostcardModalProps } from './SendPostcardModal.types';
import * as S from './SendPostcardModal.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { icons } from '../../../commons/utils/variablesImages';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import { CustomButton } from '../../../commons/components/CustomButton/CustomButton';

export const SendPostcardModal: React.FC<ISendPostcardModalProps> = ({
  personalQuiz,
  postcardInfos,
  bookInfos: books,
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentPressedQuestion, setCurrentPressedQuestion] = useState<number>(0);
  const [currentPressedPostcard, setCurrentPressedPostcard] = useState<number>(0);
  const [isQuizSection, setIsQuizSection] = useState<boolean>(true);
  const [personalQuestionAnswerText, onChangePersonalQuestionAnswerText] = useState('');
  const [checkedQuizAnswerList, setCheckedQuizAnswerList] = useState<checkedQuizAnswer[]>([]);

  const answerAlphabetIndex = ['A', 'B', 'C', 'D', 'E'];

  const moveNextQuiz = (quizId: number, checkedAnswerId: number) => {
    setCurrentQuizIndex(currentQuizIndex + 1);
    setCurrentPressedQuestion(0);
    setCheckedQuizAnswerList([...checkedQuizAnswerList, { quizId, checkedAnswerId }]);

    if (currentQuizIndex + 1 >= books.length) {
      setIsQuizSection(false);
    }
  };

  const movePreviousQuiz = () => {
    setCurrentQuizIndex(currentQuizIndex - 1);
    setCurrentPressedQuestion(checkedQuizAnswerList[currentQuizIndex - 1].checkedAnswerId);
  };

  const selectAnswer = (questionId: number) => {
    setCurrentPressedQuestion(questionId);
  };

  const selectPostcard = (postcardId: number) => {
    setCurrentPressedPostcard(postcardId);
    console.log(postcardId);
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
        </>
      ) : (
        <>
          <S.PersonalQuestionContainer>
            <S.PersonalQuestionHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                {personalQuiz}
              </CustomText>
            </S.PersonalQuestionHeaderWrapper>
            <S.PersonalQuestionAnswerInputBox
              editable
              multiline
              numberOfLines={3}
              maxLength={100}
              inputMode="text"
              placeholder="개인 질문에 대한 답변을 적어주세요👀"
              placeholderTextColor={colors.textGray2}
              textAlignVertical="top"
              onChangeText={(text: React.SetStateAction<string>) => onChangePersonalQuestionAnswerText(text)}
              style={{ backgroundColor: colors.buttonMain }}
              value={personalQuestionAnswerText}
            />
            <S.PersonalQuestionAnswerTextLengthView>
              <CustomText font="fontMedium" size="10px" color={colors.textGray3}>
                {personalQuestionAnswerText.length}/100자
              </CustomText>
            </S.PersonalQuestionAnswerTextLengthView>
          </S.PersonalQuestionContainer>
        </>
      )}
      <S.DashLine />
      {isQuizSection ? (
        <>
          <S.BookQuizContainer>
            <S.BookQuizTitleWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
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
              <TouchableOpacity
                onPress={() => moveNextQuiz(books[currentQuizIndex].bookQuiz.id, currentPressedQuestion)}
              >
                <S.BottomArrowButton source={icons.rightArrow} />
              </TouchableOpacity>
            ) : (
              <S.BottomArrowButton source={icons.disableRightArrow} />
            )}
          </S.BottomButtonContainer>
        </>
      ) : (
        <>
          <S.PostcardSelectionContainer>
            <CustomText font="fontMedium" size="16px" color="black" weight="bold">
              엽서 선택하기
            </CustomText>
            <S.PostcardImageListWrapper>
              {postcardInfos.map((postcardInfo) => (
                <TouchableWithoutFeedback key={postcardInfo.id} onPress={() => selectPostcard(postcardInfo.id)}>
                  <S.PostcardImageWrapper>
                    <S.PostcardImage source={{ uri: postcardInfo.imageUrl }} />
                    {currentPressedPostcard === postcardInfo.id && (
                      <S.TransparentWrapper>
                        <S.CheckIcon source={icons.checkPostcard} />
                      </S.TransparentWrapper>
                    )}
                  </S.PostcardImageWrapper>
                </TouchableWithoutFeedback>
              ))}
            </S.PostcardImageListWrapper>
            <CustomButton contents="엽서 보내기" />
          </S.PostcardSelectionContainer>
        </>
      )}
    </S.SendPostcardModalContainer>
  );
};
