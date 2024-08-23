import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useRoute } from '@react-navigation/native';
import { TProps } from '../../QuizStack.types';
import React, { useEffect, useState } from 'react';
import { TBookInfo } from '@screens/Library/MyBookInfoModify/MyBookInfoModify.types';
import { getBookInfo, getBookQuizInfo } from '@commons/api/postcard/library.api';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import * as S from '@screens/Home/HomeStack.styles';
import * as T from '@screens/Quiz/QuizStack.styles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { Text } from 'react-native';

const StepFirst = () => {
  useScreenLogger();
  const route = useRoute<TProps>();
  const memberBookId = route.params.bookQuizInfo;

  const [bookInfo, setBookInfo] = useState<TBookInfo | null>(null);

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

  useEffect(() => {
    // fetchBookInfo(memberBookId);
  }, [memberBookId]);

  useHeaderControl({ title: '독서 퀴즈' });
  return (
    <>
      {/* TODO: step progressbar */}
      <S.Wrapper style={{ alignItems: 'center' }}>
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
            <T.AnswerCheckbox>
              <CustomText font="fontMedium" size="16px" color="#00000099">
                {bookInfo?.firstChoice ?? 'A. 첫 번째 답'}
              </CustomText>
            </T.AnswerCheckbox>
            <T.AnswerCheckbox>
              <CustomText font="fontMedium" size="16px" color="#00000099">
                {bookInfo?.secondChoice ?? 'B. 두 번째 답'}
              </CustomText>
            </T.AnswerCheckbox>
            <T.AnswerCheckbox>
              <CustomText font="fontMedium" size="16px" color="#00000099">
                {bookInfo?.thirdChoice ?? 'C. 세 번째 답'}
              </CustomText>
            </T.AnswerCheckbox>
          </T.AnswerCheckboxContainer>
        </T.ReadingQuizTestContainer>
        {/*onPress={() => handleReset('tapScreens', resetParams)*/}
        <T.NextButton>
          <Text style={{ color: 'black', fontFamily: 'fontSemiBold', fontSize: 16 }}>다음</Text>
        </T.NextButton>
      </S.Wrapper>
    </>
  );
};

export default StepFirst;
