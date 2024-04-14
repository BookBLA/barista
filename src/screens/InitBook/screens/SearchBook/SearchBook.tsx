import { useEffect, useRef, useState } from 'react';
import { getSearchBookApi } from '../../../../commons/api/searchBook';
import { buttons, icons } from '../../../../commons/utils/variablesImages';
import { postMemberBookApi } from '../../../../commons/api/memberBook.api';
import { IBookData, IContents } from '../../InitBook.types';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchedBookList } from '../../../../commons/components/SearchedBookList/SearchedBookList';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { NoSearch } from './units/NoSearch';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitBook.styles';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import useManageMargin from '../../../../commons/hooks/useManageMargin';

const SearchBook = () => {
  useManageMargin();
  useHeaderControl({
    title: '내 서재',
    left: true,
  });
  const { movePage } = useMovePage();
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [bookList, setBookList] = useState([]);
  const [selectedBook, setSelectedBook] = useState<Partial<IBookData>>({});
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMoveTop = () => {
    if (scrollViewRef.current) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };

  const SearchBook = () => {
    if (search === '') return;
    if (pageIndex !== 1) prevEndPage();
    callGetSearchBookApi(true);
  };

  const callGetSearchBookApi = async (updateTotalPages = false) => {
    try {
      const response = await getSearchBookApi(search, pageIndex);
      if (updateTotalPages) {
        setTotalPage(response.result.totalCount);
      }
      setBookList(response.result.bookSearchResponses);
    } catch (error) {
      console.log(error);
    }
  };

  const movePageIndex = (pageIndex: number) => () => {
    setPageIndex(pageIndex);
    callGetSearchBookApi();
  };

  const changePageGroup = (direction: string) => () => {
    const newStartPage = direction === 'next' ? startPage + 5 : startPage - 5;
    if (newStartPage > 0 && newStartPage <= Math.ceil(totalPage / 10)) {
      setStartPage(newStartPage);
      setPageIndex(newStartPage);
    }
  };

  const nextEndPage = () => {
    const total = Math.ceil(totalPage / 10);
    const resultPage = total - (total % 5) + 1;
    setStartPage(resultPage);
    setPageIndex(resultPage);
  };

  const prevEndPage = () => {
    setPageIndex(1);
    setStartPage(1);
  };

  useEffect(() => {
    if (search) {
      callGetSearchBookApi();
    }
  }, [pageIndex]);

  const callPostMemberBook = async () => {
    try {
      const newData: IContents = {
        isRepresentative: true, // TODO: 성진 - bookData가 빈배열일 경우에만 트루로 변경 예정
        ...selectedBook,
        thumbnail: String(selectedBook.imageUrl),
      };
      delete newData.imageUrl;
      const response = await postMemberBookApi(newData);
      const memberBookId = response.result.memberBookId;
      if (memberBookId) {
        movePage('initBookStack', { screen: 'initQuiz', memberBookId })();
      }
    } catch (err) {
      console.log('err', err);
    }
  };

  return (
    <S.Wrapper style={{ position: 'relative' }}>
      <T.SearchContainer>
        <T.SearchBarStyled
          placeholder="원하는 책 제목 혹은 저자를 검색해 보세요."
          onChangeText={(search: string) => setSearch(search)}
        />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={icons.search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>

      <T.ColumnStyled style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
        {totalPage === 0 ? (
          <NoSearch search={search} />
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

              <T.PageIndexRow>
                <TouchableOpacity onPress={prevEndPage}>
                  <T.MovePageImageStyled source={icons.leftEndPage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={changePageGroup('prev')}>
                  <T.MovePageImageStyled source={icons.leftPage} />
                </TouchableOpacity>
                {new Array(5).fill('').map(
                  (_, index) =>
                    index + startPage <= Math.ceil(totalPage / 10) && (
                      <TouchableOpacity key={index} onPress={movePageIndex(index + startPage)}>
                        <T.PageIndexTextStyled selected={index + startPage === pageIndex}>
                          {index + startPage}
                        </T.PageIndexTextStyled>
                      </TouchableOpacity>
                    ),
                )}
                <TouchableOpacity onPress={changePageGroup('next')}>
                  <T.MovePageImageStyled source={icons.rightPage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={nextEndPage}>
                  <T.MovePageImageStyled source={icons.rightEndPage} />
                </TouchableOpacity>
              </T.PageIndexRow>
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 80, right: 10, zIndex: 2 }}>
              <TouchableOpacity onPress={handleMoveTop}>
                <Image source={buttons.moveTop} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
            </View>
            <S.NextButtonStyled
              style={{ height: 50, position: 'absolute', bottom: 10, zIndex: 1 }}
              onPress={callPostMemberBook}
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
