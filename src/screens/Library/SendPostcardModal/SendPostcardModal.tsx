import React, { useEffect, useState } from 'react';
import {
  ISendPostcardModalProps,
  TCheckedQuizAnswer,
  TMemberPersonalAsk,
  TPostcardInfo,
} from './SendPostcardModal.types';
import * as S from './SendPostcardModal.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { icons, img } from '../../../commons/utils/variablesImages';
import { Keyboard, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import { CustomButton } from '../../../commons/components/CustomButton/CustomButton';
import {
  getBookInfo,
  getBookQuizInfo,
  getMemberStyle,
  getPostcardTypeList,
  postPostcard,
} from '../../../commons/api/library.api';
import { TBookInfo } from '../MyBookInfoModify/MyBookInfoModify.types';
import useToastStore from '../../../commons/store/useToastStore';
import useFetchMemberPostcard from '../../../commons/hooks/useMemberPostcard';

export const SendPostcardModal: React.FC<ISendPostcardModalProps> = ({
  targetMemberId,
  memberBookIdList,
  isVisible,
  onClose,
}) => {
  const [currentQuizIndex, setCurrentQuizIndex] = useState<number>(0);
  const [currentPressedAnswer, setCurrentPressedAnswer] = useState<number>(-1);
  const [currentPressedPostcard, setCurrentPressedPostcard] = useState<TPostcardInfo>();
  const [isQuizSection, setIsQuizSection] = useState<boolean>(true);
  const [personalQuestionAnswerText, onChangePersonalQuestionAnswerText] = useState('');
  const [checkedQuizAnswerList, setCheckedQuizAnswerList] = useState<TCheckedQuizAnswer[]>([]);
  const [bookInfoList, setBookInfoList] = useState<TBookInfo[]>([]);
  const [memberPersonalAsk, setMemberPersonalAsk] = useState<TMemberPersonalAsk>();
  const [postcardTypeInfoList, setPostcardTypeInfoList] = useState<TPostcardInfo[]>([]);
  const { memberPostcard } = useFetchMemberPostcard();

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
    setMemberPersonalAsk({ contents: result.memberAsk!, id: result.memberAskId! });
  };

  const fetchPostcardInfo = async () => {
    const result = await getPostcardTypeList();
    setPostcardTypeInfoList(result);
  };

  const sendPostCardHandler = async () => {
    const postcardInfo = {
      quizAnswerList: checkedQuizAnswerList.map((checkedQuizAnswer) => {
        return { quizId: checkedQuizAnswer.quizId, quizAnswer: checkedQuizAnswer.answer };
      })!,
      postcardTypeId: currentPressedPostcard?.postcardTypeId!,
      receiveMemberId: targetMemberId,
      memberAskId: memberPersonalAsk?.id!,
      memberReply: personalQuestionAnswerText!,
      postcardPayType: 'Free',
    };

    try {
      await postPostcard(postcardInfo);
      onClose();
      useToastStore.getState().showToast({ content: '엽서 보내기에 성공했습니다.😀' });
    } catch (error) {
      useToastStore.getState().showToast({ content: '엽서 보내기에 실패했습니다.😀' });
    }
  };

  const getCurrentAnswer = (index: number) => {
    switch (index) {
      case 0:
        return bookInfoList[currentQuizIndex].firstChoice;
      case 1:
        return bookInfoList[currentQuizIndex].secondChoice;
      case 2:
        return bookInfoList[currentQuizIndex].thirdChoice;
    }
  };

  useEffect(() => {
    if (isVisible) {
      fetchMemberPersonalAsk(targetMemberId);
      fetchBookInfo(memberBookIdList);
      fetchPostcardInfo();
    }
  }, [isVisible]);

  const moveNextQuiz = (checkedAnswerIndex: number, answer: string) => {
    setCheckedQuizAnswerList((prev) => {
      const newList = [...prev];
      newList[currentQuizIndex] = { index: checkedAnswerIndex, answer, quizId: bookInfoList[currentQuizIndex].quizId! };
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
      setCurrentPressedAnswer(checkedQuizAnswerList[currentQuizIndex + 1].index);
    } else {
      setCurrentPressedAnswer(-1);
    }
  };

  const movePreviousQuiz = () => {
    setCurrentQuizIndex((prev) => prev - 1);
    setCurrentPressedAnswer(checkedQuizAnswerList[currentQuizIndex - 1].index);
  };

  const selectAnswer = (questionId: number) => {
    setCurrentPressedAnswer(questionId);
  };

  const selectPostcard = (postcardId: TPostcardInfo) => {
    setCurrentPressedPostcard(postcardId);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.SendPostcardModalContainer>
        {isQuizSection ? (
          <>
            <S.BookInfoContainer>
              <S.BookWrapper>
                <S.BookImage
                  source={
                    bookInfoList[currentQuizIndex]?.imageUrl
                      ? { uri: bookInfoList[currentQuizIndex]?.imageUrl }
                      : img.prepareBookImage
                  }
                />
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
                  {memberPersonalAsk?.contents}
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
                scrollEnabled
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
                <CustomText font="fontMedium" size="16px" color="black" weight="bold" numberOfLines={7}>
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
                        backgroundColor: currentPressedAnswer === index ? '#AFDFF8' : colors.buttonPrimary,
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
              {currentPressedAnswer !== -1 ? (
                <TouchableOpacity
                  onPress={() => moveNextQuiz(currentPressedAnswer, getCurrentAnswer(currentPressedAnswer)!)}
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
                {postcardTypeInfoList?.map((postcardInfo) => (
                  <TouchableWithoutFeedback
                    key={postcardInfo.postcardTypeId}
                    onPress={() => selectPostcard(postcardInfo)}
                  >
                    <S.PostcardImageWrapper>
                      <S.PostcardImage source={{ uri: postcardInfo.postcardImageUrl }} />
                      {currentPressedPostcard?.postcardTypeId === postcardInfo.postcardTypeId && (
                        <S.TransparentWrapper>
                          <S.CheckIcon source={icons.checkPostcard} />
                        </S.TransparentWrapper>
                      )}
                    </S.PostcardImageWrapper>
                  </TouchableWithoutFeedback>
                ))}
              </S.PostcardImageListWrapper>
              <CustomButton onPress={sendPostCardHandler} contents="엽서 보내기" />
            </S.PostcardSelectionContainer>
          </>
        )}
      </S.SendPostcardModalContainer>
    </TouchableWithoutFeedback>
  );
};
