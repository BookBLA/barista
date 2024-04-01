import * as S from './SearchedBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';

export const SearchedBookList = () => {
  return (
    <S.BookListStyled>
      <TouchableOpacity
      //  onPress={movePage('bookDetail')}
      >
        <Image
          style={{ height: 100, width: 72, marginRight: 14, borderRadius: 6 }}
          source={require('../../../../assets/images/example-book.png')}
        />
      </TouchableOpacity>
      <S.ColumnStyled>
        <S.BookTitleStyled>나미야 잡화점의 기적</S.BookTitleStyled>
        <S.BookAuthorStyled>히가시노 게이고</S.BookAuthorStyled>
        <View
          style={{
            width: '100%',
            height: '40%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        ></View>
      </S.ColumnStyled>
    </S.BookListStyled>
  );
};
