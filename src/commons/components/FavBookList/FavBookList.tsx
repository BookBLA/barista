import InitQuiz from '../../../screens/InitBook/units/InitQuiz';
import useMovePage from '../../hooks/useMovePage';
import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import bookClip from '../../../../assets/images/icons/BookClip.png';

export const FavBookList = () => {
  const { movePage } = useMovePage();
  return (
    <S.BookListStyled>
      <Image
        style={{ height: 62, width: 62, marginRight: '3%' }}
        source={require('../../../../assets/images/example-book.png')}
      />
      <S.ColumnStyled style={{ backgroundColor: 'pink' }}>
        <S.BookTitleStyled>나미야 잡화점의 기적</S.BookTitleStyled>
        <S.BookAuthorStyled>히가시노 게이고</S.BookAuthorStyled>
        {/* <View
          style={{
            width: '100%',
            height: '40%',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
          }}
        >
          <TouchableOpacity onPress={movePage('initQuiz')}>
            <S.DeleteTextStyled>삭제하기</S.DeleteTextStyled>
          </TouchableOpacity>
        </View> */}
      </S.ColumnStyled>
      <S.ColumnStyled2>
        <Image source={bookClip} style={{ height: 26, width: 15 }} />
      </S.ColumnStyled2>
    </S.BookListStyled>
  );
};
