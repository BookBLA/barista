import React from 'react';
import { IViewBookInfoProps } from './ViewBookInfo.types';
import * as S from './ViewBookInfo.styles';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';

export const ViewBookInfo: React.FC<IViewBookInfoProps> = ({ bookImageUrl, bookAuthors, bookName, bookReview }) => {
  return (
    <>
      <S.BookInfoContainer>
        <S.BookWrapper>
          <S.BookImage source={{ uri: bookImageUrl }} />
        </S.BookWrapper>
        <S.BookTitleWrapper>
          <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
            {bookName}
          </CustomText>
          <CustomText font="fontLight" size="14px" color="#616C90">
            {bookAuthors.join(', ')}
          </CustomText>
        </S.BookTitleWrapper>
      </S.BookInfoContainer>
      <S.DashLine />
      <S.BookReviewContainer>
        <S.BookReviewHeaderWrapper>
          <CustomText font="fontMedium" size="16px" color="black" weight="bold">
            한 줄 감상문
          </CustomText>
        </S.BookReviewHeaderWrapper>
        <S.BookReviewWrapper>
          <CustomText font="fontRegular" size="14px" color="black">
            {bookReview}
          </CustomText>
        </S.BookReviewWrapper>
      </S.BookReviewContainer>
    </>
  );
};
