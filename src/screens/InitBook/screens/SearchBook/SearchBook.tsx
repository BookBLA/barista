import { useEffect, useState } from 'react';
import { buttons, icons } from '../../../../commons/utils/variablesImages';
import { IBookData } from '../../InitBookStack.types';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchedBookList } from '../../../../commons/components/SearchedBookList/SearchedBookList';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { NoSearch } from './units/NoSearch';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { useHandleMoveTop } from '../../../../commons/hooks/useHandleMoveTop';
import { useSearchBooks } from './hooks/useSearchBooks';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitBookStack.styles';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import Pagination from '../../../../commons/components/Pagination/Pagination';
import usePagination from '../../../../commons/hooks/usePagination';
import { IProps } from './SearchBook.types';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useToastStore from '../../../../commons/store/useToastStore';

const SearchBook = ({ route }: IProps) => {
  useManageMargin();
  useHeaderControl({
    title: '내 서재',
    left: true,
  });
  const { movePage } = useMovePage();
  const { isRepresentative } = route.params;
  const { handleMoveTop, scrollViewRef } = useHandleMoveTop();
  const { pageIndex, startPage, totalPage, setTotalPage, movePageIndex, changePageGroup, nextEndPage, prevEndPage } =
    usePagination();
  const { bookList, resultSearch, callGetSearchBookApi } = useSearchBooks(setTotalPage);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<Partial<IBookData>>({});
  const showToast = useToastStore((state) => state.showToast);

  const SearchBook = () => {
    if (search === '')
      return showToast({
        content: '검색어를 입력하세요',
      });
    if (pageIndex !== 1) prevEndPage();
    callGetSearchBookApi(search, pageIndex, true);
  };

  useEffect(() => {
    callGetSearchBookApi(search, pageIndex);
  }, [pageIndex]);

  return (
    <S.Wrapper style={{ position: 'relative' }}>
      <T.SearchContainer>
        <T.SearchBarStyled
          placeholder="원하는 책 제목 혹은 저자를 검색해 보세요."
          onChangeText={(search: string) => setSearch(search)}
          onSubmitEditing={SearchBook}
        />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={icons.search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>

      <T.ColumnStyled style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
        {totalPage === 0 ? (
          <NoSearch search={resultSearch} />
        ) : totalPage > 0 ? (
          <>
            <ScrollView
              ref={scrollViewRef}
              style={{ flex: 1, paddingLeft: 16, paddingRight: 16, position: 'relative' }}
            >
              <CustomText font="fontRegular" size="12px">
                검색결과 {totalPage}건
              </CustomText>
              {bookList.map((item: IBookData, index) => (
                <SearchedBookList
                  key={index}
                  item={item}
                  isSelected={item.isbn === selectedBook?.isbn}
                  onSelectBook={setSelectedBook}
                />
              ))}
              <Pagination
                pageIndex={pageIndex}
                startPage={startPage}
                totalPage={totalPage}
                movePageIndex={movePageIndex}
                changePageGroup={changePageGroup}
                prevEndPage={prevEndPage}
                nextEndPage={nextEndPage}
              />
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 95, right: 10, zIndex: 2 }}>
              <TouchableOpacity onPress={() => handleMoveTop()}>
                <Image source={buttons.moveTop} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
            </View>
            <S.NextButtonStyled
              style={{ height: 50, position: 'absolute', bottom: 10, zIndex: 1 }}
              onPress={movePage('initQuiz', { isRepresentative, selectedBook })}
            >
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
            </S.NextButtonStyled>
          </>
        ) : null}
      </T.ColumnStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
