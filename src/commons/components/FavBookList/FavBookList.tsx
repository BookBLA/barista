import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import { FavBookListProps } from './FavBookList.types';
import { deleteMemberBookApi } from '../../api/memberBook.api';
import { useErrorMessage } from '../../store/useErrorMessage';
import { icons } from '../../utils/variablesImages';

export const FavBookList: React.FC<FavBookListProps> = ({ representative = false, fetchGetMemberBook, item }) => {
  const callDeleteMemberBook = async () => {
    try {
      await deleteMemberBookApi(item.memberBookId);
      await fetchGetMemberBook();
    } catch (error) {
      if (error instanceof Error) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
    }
  };

  return (
    <S.BookListStyled>
      <Image style={{ height: 62, width: 62, marginRight: '3%', borderRadius: 10 }} source={{ uri: item.thumbnail }} />
      <S.ColumnStyled>
        <S.BookTitleStyled>{item.title}</S.BookTitleStyled>
        <S.BookAuthorStyled>{item.authors.join(', ')}</S.BookAuthorStyled>
        <View
          style={{
            width: '100%',
            height: '40%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <TouchableOpacity onPress={callDeleteMemberBook}>
            <S.DeleteTextStyled>삭제하기</S.DeleteTextStyled>
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
      {representative && <S.BookMarkIconImage source={icons.bookmark} />}
    </S.BookListStyled>
  );
};
