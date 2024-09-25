import * as T from '@screens/Quiz/QuizStack.styles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import React, { useEffect, useState } from 'react';
import { TBookInfo } from '@screens/Library/MyBookInfoModify/MyBookInfoModify.types';
import { getBookInfo, getBookQuizInfo } from '@commons/api/postcard/library.api';
import { TProps } from '@screens/Quiz/QuizStack.types';

export const BookInfo: React.FC<TProps> = ({ params }) => {
  const memberBookId = params.memberBookId;
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
    fetchBookInfo(memberBookId);
  }, [memberBookId]);

  return (
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
  );
};
