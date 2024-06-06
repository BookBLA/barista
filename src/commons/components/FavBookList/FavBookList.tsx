import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import { FavBookListProps } from './FavBookList.types';
import { deleteMemberBookApi } from '../../api/memberBook.api';
import { useErrorMessage } from '../../store/useErrorMessage';
import { icons, img } from '../../utils/variablesImages';
import truncateText from '../../utils/truncateText';

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
      <S.ImageWrapper>
        <Image
          style={{ height: 62, width: 62, borderRadius: 10, objectFit: 'fill' }}
          source={item.thumbnail ? { uri: item.thumbnail } : img.prepareBookImage}
        />
      </S.ImageWrapper>
      <S.ColumnStyled>
        <S.BookTitleStyled>{truncateText(item.title, 40)}</S.BookTitleStyled>
        <S.BookAuthorStyled>{truncateText(item?.authors.join(', '), 30)}</S.BookAuthorStyled>
        <View
          style={{
            width: '100%',
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
