import { icons } from '../../utils/variablesImages';
import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import { FavBookListProps } from './FavBookList.types';
import { deleteMemberBookApi } from '../../api/memberBook.api';
import { useErrorMessage } from '../../store/useErrorMessage';

export const FavBookList: React.FC<FavBookListProps> = ({
  representative = false,
  memberBookId,
  imageUrl,
  fetchGetMemberBook,
}) => {
  const callDeleteMemberBook = async () => {
    try {
      await deleteMemberBookApi(memberBookId);
      await fetchGetMemberBook();
    } catch (error) {
      if (error instanceof Error) {
        useErrorMessage.getState().setErrorMessage(error.message);
      }
    }
  };

  return (
    <S.BookListStyled>
      <Image style={{ height: 62, width: 62, marginRight: '3%', borderRadius: 10 }} source={imageUrl} />
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
