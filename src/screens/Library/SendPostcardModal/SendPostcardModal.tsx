import React, { useEffect, useState } from 'react';
import { ISendPostcardModalProps } from './SendPostcardModal.types';
import * as S from './SendPostcardModal.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { icons } from '../../../commons/utils/variablesImages';
import { TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import { CustomButton } from '../../../commons/components/CustomButton/CustomButton';
import { getBookInfo, getBookQuizInfo, getMemberStyle } from '../../../commons/api/library.api';
import { TBookInfo } from '../MyBookInfoModify/MyBookInfoModify.types';

export const SendPostcardModal: React.FC<ISendPostcardModalProps> = ({
  targetMemberId,
  postcardInfos,
  memberBookIdList,
  isVisible,
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentPressedQuestion, setCurrentPressedQuestion] = useState<number>(-1);
  const [currentPressedPostcard, setCurrentPressedPostcard] = useState<number>(0);
  const [isQuizSection, setIsQuizSection] = useState<boolean>(true);
  const [personalQuestionAnswerText, onChangePersonalQuestionAnswerText] = useState('');
  const [checkedQuizAnswerList, setCheckedQuizAnswerList] = useState<number[]>([]);
  const [bookInfoList, setBookInfoList] = useState<TBookInfo[]>([]);
  const [memberPersonalAsk, setMemberPersonalAsk] = useState<string>('');

  const answerAlphabetIndex = ['A', 'B', 'C', 'D', 'E'];

  const fetchBookInfo = async (memberBookIdList: number[]) => {
    const bookInfoResultList = await Promise.all(memberBookIdList.map((memberBookId) => getBookInfo(memberBookId)));
    const bookQuizInfoResultList = await Promise.all(
      memberBookIdList.map((memberBookId) => getBookQuizInfo(memberBookId)),
    );

    const updatedBookInfoList = bookInfoResultList.map((bookInfoResult) => {
      const quizInfo = bookQuizInfoResultList.find(
        (bookQuizInfo) => bookQuizInfo.memberBookId === bookInfoResult.memberBookId,
      );
      return {
        memberBookId: bookInfoResult.memberBookId,
        title: bookInfoResult.title,
        imageUrl: bookInfoResult.imageUrl,
        authors: bookInfoResult.authors,
        quizId: quizInfo ? quizInfo.id : undefined,
        quiz: quizInfo ? quizInfo.quiz : undefined,
        firstChoice: quizInfo ? quizInfo.firstChoice : undefined,
        secondChoice: quizInfo ? quizInfo.secondChoice : undefined,
        thirdChoice: quizInfo ? quizInfo.thirdChoice : undefined,
      };
    });

    setBookInfoList(updatedBookInfoList);
  };

  const fetchMemberPersonalAsk = async (targetMemberId: number) => {
    const result = await getMemberStyle(targetMemberId);
    setMemberPersonalAsk(result.memberAsk || '개인질문입니다.');
  };

  useEffect(() => {
    if (isVisible) {
      fetchMemberPersonalAsk(targetMemberId);
      fetchBookInfo(memberBookIdList);
    }
  }, [isVisible]);

  const moveNextQuiz = (checkedAnswerIndex: number) => {
    setCheckedQuizAnswerList((prev) => {
      const newList = [...prev];
      newList[currentQuizIndex] = checkedAnswerIndex;
      return newList;
    });
    setCurrentQuizIndex((prev) => {
      const nextIndex = prev + 1;
      if (nextIndex >= bookInfoList.length) {
        setIsQuizSection(false);
      }
      return nextIndex;
    });
    if (checkedQuizAnswerList[currentQuizIndex + 1]) {
      setCurrentPressedQuestion(checkedQuizAnswerList[currentQuizIndex + 1]);
    } else {
      setCurrentPressedQuestion(-1);
    }
  };

  const movePreviousQuiz = () => {
    setCurrentQuizIndex((prev) => prev - 1);
    setCurrentPressedQuestion(checkedQuizAnswerList[currentQuizIndex - 1]);
  };

  const selectAnswer = (questionId: number) => {
    setCurrentPressedQuestion(questionId);
  };

  const selectPostcard = (postcardId: number) => {
    setCurrentPressedPostcard(postcardId);
  };

  return (
    <S.SendPostcardModalContainer>
      {isQuizSection ? (
        <>
          <S.BookInfoContainer>
            <S.BookWrapper>
              <S.BookImage source={{ uri: bookInfoList[currentQuizIndex]?.imageUrl }} />
            </S.BookWrapper>
            <S.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
                {bookInfoList[currentQuizIndex]?.title}
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#616C90">
                {bookInfoList[currentQuizIndex]?.authors?.join(', ')}
              </CustomText>
            </S.BookTitleWrapper>
          </S.BookInfoContainer>
        </>
      ) : (
        <>
          <S.PersonalQuestionContainer>
            <S.PersonalQuestionHeaderWrapper>
              <CustomText font="fontMedium" size="16px" color="black" weight="bold">
                {memberPersonalAsk}
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
                {bookInfoList[currentQuizIndex]?.quiz}
              </CustomText>
            </S.BookQuizTitleWrapper>
            {[
              bookInfoList[currentQuizIndex]?.firstChoice,
              bookInfoList[currentQuizIndex]?.secondChoice,
              bookInfoList[currentQuizIndex]?.thirdChoice,
            ].map((question, index) => (
              <TouchableOpacity key={index} onPress={() => selectAnswer(index)}>
                <S.BookQuizInfoView>
                  <S.QuizCircle
                    style={{
                      backgroundColor: currentPressedQuestion === index ? '#AFDFF8' : colors.buttonPrimary,
                    }}
                  >
                    <S.QuizCircleText>{answerAlphabetIndex[index]}</S.QuizCircleText>
                  </S.QuizCircle>
                  <S.BookQuizAnswerWrapper>
                    <S.BookQuizAnswerView>
                      <CustomText font="fontLight" size="12px" color="black">
                        {question}
                      </CustomText>
                    </S.BookQuizAnswerView>
                  </S.BookQuizAnswerWrapper>
                </S.BookQuizInfoView>
              </TouchableOpacity>
            ))}
          </S.BookQuizContainer>
          <S.BottomButtonContainer isSingle={currentQuizIndex === 0}>
            {currentQuizIndex > 0 && (
              <TouchableOpacity onPress={() => movePreviousQuiz()}>
                <S.BottomArrowButton source={icons.leftArrow} />
              </TouchableOpacity>
            )}
            {currentPressedQuestion !== -1 ? (
              <TouchableOpacity onPress={() => moveNextQuiz(currentPressedQuestion)}>
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
