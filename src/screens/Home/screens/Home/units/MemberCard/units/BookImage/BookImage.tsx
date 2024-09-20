import * as S from './BookImage.styles';

const BookImage = ({ bookImage }) => {
  console.log('memberData?.bookCoverImageUrl', bookImage);
  return (
    <S.Wrapper>
      <S.BookWrapper>
        <S.BookImage source={{ uri: bookImage }} />
      </S.BookWrapper>
      <S.BookBackground source={{ uri: bookImage }} />
      <S.TransparentBackground />
    </S.Wrapper>
  );
};

export default BookImage;
