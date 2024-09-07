import { example } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './BookImage.styles';

const BookImage = () => {
  return (
    <S.Wrapper>
      <S.BookWrapper>
        <S.BookImage source={example.book} />
      </S.BookWrapper>
      <S.BookBackground source={example.book} />
      <S.TransparentBackground />
    </S.Wrapper>
  );
};

export default BookImage;
