import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import { FavBookListProps } from './FavBookList.types';
import { deleteMemberBookApi } from '../../api/members/book/memberBook.api';
import { icons, img } from '../../utils/variablesImages';
import truncateText from '../../utils/truncateText';
import { EStatusCode } from '../../types/statusCode';
import { isAxiosErrorResponse } from '../../utils/isAxiosErrorResponse';
import useToastStore from '../../store/useToastStore';

export const FavBookList: React.FC<FavBookListProps> = ({ representative = false, fetchGetMemberBook, item }) => {
  const showToast = useToastStore((state) => state.showToast);

  const callDeleteMemberBook = async () => {
    try {
      await deleteMemberBookApi(item.memberBookId);
      await fetchGetMemberBook();
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      const { code, message } = error.response.data;
      if (code === EStatusCode.MEMBER_BOOK_005) {
        showToast({
          content: message,
        });
      } else {
        showToast({
          content: '알 수 없는 이유로 삭제에 실패하였습니다.',
        });
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
        <View>
          <S.BookTitleStyled>{truncateText(item.title, 40)}</S.BookTitleStyled>
          <S.BookAuthorStyled>{truncateText(item?.authors.join(', '), 30)}</S.BookAuthorStyled>
        </View>
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
