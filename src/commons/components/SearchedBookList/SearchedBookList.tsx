import useMovePage from '../../hooks/useMovePage';
import * as S from './SearchedBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';

export const SearchedBookList = () => {
  const { movePage } = useMovePage();

  return (
    <S.BookListStyled>
      <TouchableOpacity onPress={movePage('initQuiz')}>
        <Image
          style={{ height: 100, width: 72, marginRight: 14, borderRadius: 6 }}
          source={require('../../../../assets/images/example-book.png')}
        />
      </TouchableOpacity>
      <S.ColumnStyled>
        <S.BookTitleStyled>나미야 잡화점의 기적</S.BookTitleStyled>
        <S.BookAuthorStyled>히가시노 게이고</S.BookAuthorStyled>
      </S.ColumnStyled>
    </S.BookListStyled>
  );
};
