import InitQuiz from '../../../screens/InitBook/units/InitQuiz';
import useMovePage from '../../hooks/useMovePage';
import { icons } from '../../utils/variablesImages';
import * as S from './FavBookList.styles';
import { Image, TouchableOpacity, View } from 'react-native';
import { FavBookListProps } from './FavBookList.types';

export const FavBookList: React.FC<FavBookListProps> = ({ representative }) => {
  const { movePage } = useMovePage();
  // const representative = {
  //   representative: false,
  // };

  // const props = {
  //   representative: false
  // };
  return (
    <S.BookListStyled>
      <Image
        style={{ height: 62, width: 62, marginRight: '3%', borderRadius: 10 }}
        source={require('../../../../assets/images/example-book.png')}
      />
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
          <TouchableOpacity onPress={movePage('initQuiz')}>
            <S.DeleteTextStyled>삭제하기</S.DeleteTextStyled>
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
      {representative && <S.BookMarkIconImage source={icons.bookmark} />}
    </S.BookListStyled>
  );
};
