import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useRoute } from '@react-navigation/native';
import { TProps } from '../QuizStack.types';
import React, { useEffect, useState } from 'react';
import { TBookInfo } from '@screens/Library/MyBookInfoModify/MyBookInfoModify.types';
import { getBookInfo, getBookQuizInfo } from '@commons/api/postcard/library.api';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import * as S from '@screens/Home/HomeStack.styles';
import * as T from '@screens/Quiz/QuizStack.styles';
import { icons, img } from '@commons/utils/ui/variablesImages/variablesImages';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { Image, Text } from 'react-native';
import { colors } from '@commons/styles/variablesStyles';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';

const StepFirst = () => {
  useScreenLogger();
  const { movePage } = useMovePage();
  const route = useRoute<TProps>();
  // @ts-ignore
  const memberBookId = route.params['memberBookId'];

  const [bookInfo, setBookInfo] = useState<TBookInfo | null>(null);
  const [currentPressedAnswer, setCurrentPressedAnswer] = useState<number>(-1);
  const [currentPressedAnswerString, setCurrentPressedAnswerString] = useState<string>('');
  const [isCorrectAnswer, setIsCorrectAnswer] = useState(false);

  const fetchBookInfo = async (memberBookId: number) => {
    const bookInfoResult = await getBookInfo(memberBookId);
    const bookQuizInfoResult = await getBookQuizInfo(memberBookId);

    const updatedBookInfo = {
      memberBookId: bookInfoResult.memberBookId,
      title: bookInfoResult.title,
      imageUrl: bookInfoResult.imageUrl,
      authors: bookInfoResult.authors,
      quizId: bookQuizInfoResult ? bookQuizInfoResult.id : undefined,
      quiz: bookQuizInfoResult ? bookQuizInfoResult.quiz : undefined,
      firstChoice: bookQuizInfoResult ? bookQuizInfoResult.firstChoice : undefined,
      secondChoice: bookQuizInfoResult ? bookQuizInfoResult.secondChoice : undefined,
      thirdChoice: bookQuizInfoResult ? bookQuizInfoResult.thirdChoice : undefined,
    };

    setBookInfo(updatedBookInfo);
  };

  const selectAnswer = (questionId: number, answer: string) => {
    setCurrentPressedAnswer(questionId);
    setCurrentPressedAnswerString(answer);
  };

  const checkQuizAnswer = async (memberBookId: number) => {
    // 정답 넘겨서 확인 후 isCorrectAnswer 수정.
    setIsCorrectAnswer(true);
  };

  useEffect(() => {
    // fetchBookInfo(memberBookId);
  }, [memberBookId]);

  useHeaderControl({ title: '독서 퀴즈' });
  return (
    <>
      <S.Wrapper style={{ alignItems: 'center' }}>
        <T.StepProgressBar>
          <T.StepLineFirst />
          <T.StepImage>
            <Image source={icons.currentStep} style={{ width: 16, height: 16 }} />
            <T.StepName>Step 01</T.StepName>
          </T.StepImage>
          <T.StepImage>
            <Image source={icons.nextStep} style={{ margin: 1, width: 14, height: 14 }} />
            <T.StepName style={{ opacity: 0.4 }}>Step 02</T.StepName>
          </T.StepImage>
          <T.StepImage>
            <Image source={icons.nextStep} style={{ margin: 1, width: 14, height: 14 }} />
            <T.StepName style={{ opacity: 0.4 }}>Step 03</T.StepName>
          </T.StepImage>
        </T.StepProgressBar>
        <T.ReadingQuizInfoContainer>
          <T.BookImage source={bookInfo?.imageUrl ? { uri: bookInfo?.imageUrl } : img.prepareBookImage} />
          <T.BookTextContainer>
            <T.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="20px" color="white">
                {bookInfo?.title ?? '도서명 도서명 도서명 도서명 도서명'}
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#FFFFFFAA">
                {bookInfo?.authors?.join(', ') ?? '저자명'}
              </CustomText>
            </T.BookTitleWrapper>
          </T.BookTextContainer>
        </T.ReadingQuizInfoContainer>
        <T.ReadingQuizTestContainer>
          <T.QuizTitleContainer>
            <CustomText font="fontSemiBold" size="18px" color="black">
              {bookInfo?.quiz ?? '독서 퀴즈'}
            </CustomText>
          </T.QuizTitleContainer>
          <T.AnswerCheckboxContainer>
            <T.AnswerCheckbox
              onPress={() => selectAnswer(1, bookInfo?.firstChoice ?? '첫 번째 답')}
              style={[
                isCorrectAnswer &&
                  currentPressedAnswer === 1 && {
                    backgroundColor: colors.buttonCorrect,
                    borderColor: colors.buttonCorrectBorder,
                  },
                !isCorrectAnswer && {
                  backgroundColor: currentPressedAnswer === 1 ? colors.buttonBackground : 'white',
                  borderColor: currentPressedAnswer === 1 ? colors.buttonPrimary : colors.buttonBorder,
                },
              ]}
              disabled={isCorrectAnswer}
            >
              <CustomText
                font="fontMedium"
                size="16px"
                color={
                  isCorrectAnswer && currentPressedAnswer === 1
                    ? colors.buttonCorrectBorder
                    : currentPressedAnswer === 1
                      ? colors.buttonPrimary
                      : '#00000099'
                }
              >
                A. {bookInfo?.firstChoice ?? '첫 번째 답'}
              </CustomText>
              <T.AnswerCheckRadioButton
                source={
                  isCorrectAnswer && currentPressedAnswer === 1
                    ? icons.radiobuttonCorrect
                    : currentPressedAnswer === 1
                      ? icons.radiobuttonSelected
                      : icons.radiobuttonDefault
                }
              />
            </T.AnswerCheckbox>
            <T.AnswerCheckbox
              onPress={() => selectAnswer(2, bookInfo?.secondChoice ?? '두 번째 답')}
              style={[
                isCorrectAnswer &&
                  currentPressedAnswer === 2 && {
                    backgroundColor: colors.buttonCorrect,
                    borderColor: colors.buttonCorrectBorder,
                  },
                !isCorrectAnswer && {
                  backgroundColor: currentPressedAnswer === 2 ? colors.buttonBackground : 'white',
                  borderColor: currentPressedAnswer === 2 ? colors.buttonPrimary : colors.buttonBorder,
                },
              ]}
              disabled={isCorrectAnswer}
            >
              <CustomText
                font="fontMedium"
                size="16px"
                color={
                  isCorrectAnswer && currentPressedAnswer === 2
                    ? colors.buttonCorrectBorder
                    : currentPressedAnswer === 2
                      ? colors.buttonPrimary
                      : '#00000099'
                }
              >
                B. {bookInfo?.secondChoice ?? '두 번째 답'}
              </CustomText>
              <T.AnswerCheckRadioButton
                source={
                  isCorrectAnswer && currentPressedAnswer === 2
                    ? icons.radiobuttonCorrect
                    : currentPressedAnswer === 2
                      ? icons.radiobuttonSelected
                      : icons.radiobuttonDefault
                }
              />
            </T.AnswerCheckbox>
            <T.AnswerCheckbox
              onPress={() => selectAnswer(3, bookInfo?.thirdChoice ?? '세 번째 답')}
              style={[
                isCorrectAnswer &&
                  currentPressedAnswer === 3 && {
                    backgroundColor: colors.buttonCorrect,
                    borderColor: colors.buttonCorrectBorder,
                  },
                !isCorrectAnswer && {
                  backgroundColor: currentPressedAnswer === 3 ? colors.buttonBackground : 'white',
                  borderColor: currentPressedAnswer === 3 ? colors.buttonPrimary : colors.buttonBorder,
                },
              ]}
              disabled={isCorrectAnswer}
            >
              <CustomText
                font="fontMedium"
                size="16px"
                color={
                  isCorrectAnswer && currentPressedAnswer === 3
                    ? colors.buttonCorrectBorder
                    : currentPressedAnswer === 3
                      ? colors.buttonPrimary
                      : '#00000099'
                }
              >
                C. {bookInfo?.thirdChoice ?? '세 번째 답'}
              </CustomText>
              <T.AnswerCheckRadioButton
                source={
                  isCorrectAnswer && currentPressedAnswer === 3
                    ? icons.radiobuttonCorrect
                    : currentPressedAnswer === 3
                      ? icons.radiobuttonSelected
                      : icons.radiobuttonDefault
                }
              />
            </T.AnswerCheckbox>
          </T.AnswerCheckboxContainer>
        </T.ReadingQuizTestContainer>

        <T.NextButton
          onPress={() => checkQuizAnswer(memberBookId)}
          style={{ opacity: currentPressedAnswer === -1 ? 0.3 : 1, display: isCorrectAnswer ? 'none' : 'flex' }}
          disabled={currentPressedAnswer === -1}
        >
          <Text style={{ color: 'black', fontFamily: 'fontSemiBold', fontSize: 16 }}>다음</Text>
        </T.NextButton>
        <T.NextButton
          onPress={movePage('stepSecond', { memberBookId })}
          style={{ display: isCorrectAnswer ? 'flex' : 'none' }}
          disabled={currentPressedAnswer === -1}
        >
          <Text style={{ color: 'black', fontFamily: 'fontSemiBold', fontSize: 16 }}>다음</Text>
        </T.NextButton>
      </S.Wrapper>
    </>
  );
};

export default StepFirst;
