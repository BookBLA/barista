import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import React from 'react';
import * as S from './ViewBookInfo.styles';
import { IViewBookInfoProps } from './ViewBookInfo.types';

export const ViewBookInfo: React.FC<IViewBookInfoProps> = ({ bookImageUrl, bookAuthors, bookName, bookReview }) => {
  return (
    <>
      <S.BookInfoContainer>
        <S.BookWrapper>
          <S.BookImage source={bookImageUrl ? { uri: bookImageUrl } : img.prepareBookImage} />
        </S.BookWrapper>
        <S.BookTitleWrapper>
          <CustomText style={{ marginBottom: 4 }} font="fontMedium" size="16px" color="black" weight="bold">
            {bookName}
          </CustomText>
          <CustomText font="fontLight" size="14px" color="#616C90">
            {bookAuthors?.join(', ')}
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
