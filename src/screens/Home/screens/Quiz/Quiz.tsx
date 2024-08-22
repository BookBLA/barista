import * as S from '@screens/Home/HomeStack.styles';
import * as T from './Quiz.styles';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import React, { useState } from 'react';
import { TBookInfo } from '@screens/Library/MyBookInfoModify/MyBookInfoModify.types';
import { getBookInfo, getBookQuizInfo } from '@commons/api/postcard/library.api';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';

const Quiz = () => {
  // TODO: BookId값 받아서 책 한권의 정보, 퀴즈 띄워주기
  const [bookInfoList, setBookInfoList] = useState<TBookInfo[]>([]);

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

  useHeaderControl({ title: '독서 퀴즈' });
  return (
    <>
      <S.Wrapper>
        <T.ReadingQuizInfoContainer>
          <T.BookImage source={bookInfoList[0]?.imageUrl ? { uri: bookInfoList[0]?.imageUrl } : img.prepareBookImage} />
          <T.BookTextContainer>
            <T.BookTitleWrapper>
              <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="20px" color="black">
                하이욤{/*{bookInfoList[0]?.title}*/}
              </CustomText>
              <CustomText font="fontLight" size="14px" color="#616C90">
                바이욤{/*{bookInfoList[0]?.authors?.join(', ')}*/}
              </CustomText>
            </T.BookTitleWrapper>
          </T.BookTextContainer>
        </T.ReadingQuizInfoContainer>
      </S.Wrapper>
    </>
  );
};

export default Quiz;
