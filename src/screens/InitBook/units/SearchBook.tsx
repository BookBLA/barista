import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitBook.styles';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import backArrow from '../../../../assets/images/icons/BackArrow.png';
import Search from '../../../../assets/images/icons/search.png';
import { ScrollView } from 'react-native-gesture-handler';
import { SearchedBookList } from '../../../commons/components/SearchedBookList/SearchedBookList';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import MoveTop from '../../../../assets/images/buttons/MoveTop.png';
import { NoSearch } from './NoSearch';
import useHeaderControl from '../../../commons/hooks/useHeaderControl';
import { useEffect, useRef, useState } from 'react';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import { getSearchBookApi } from '../../../commons/api/searchBook';
import { icons } from '../../../commons/utils/variablesImages';

const SearchBook = () => {
  const { movePage } = useMovePage();
  const [search, setSearch] = useState('');
  const [pageIndex, setPageIndex] = useState(1);
  const [totalResult, setTotalResult] = useState(null);
  const [totalPage, setTotalPage] = useState(0);
  const [startPage, setStartPage] = useState(1);
  const [bookList, setBookList] = useState([]);

  useHeaderControl({
    title: '내 서재',
    left: true,
  });

  const scrollViewRef = useRef(null);
  const handleMoveTop = () => {
    if (scrollViewRef.current) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };

  useManageMargin();

  const SearchBook = () => {
    if (search === '') return;
    // console.log('SearchBook');
    callGetSearchBookApi();
    setTotalPage(Math.ceil(totalResult / 10));
  };
  console.log('totalPage', totalPage);
  const callGetSearchBookApi = async () => {
    try {
      // console.log('callGetSearchBookApi', search);
      const response = await getSearchBookApi(search, pageIndex);
      // console.log(response);
      // console.log(response.result.bookSearchResponses);
      setTotalResult(response.result.totalCount);
      setBookList(response.result.bookSearchResponses);
    } catch (error) {
      console.log(error);
    }
  };
  const movePageIndex = (pageIndex: number) => () => {
    console.log('movePageIndex', pageIndex);

    setPageIndex(pageIndex);
    callGetSearchBookApi();
  };

  const nextPage = () => {
    setStartPage((prev) => prev + 5);
    setPageIndex(startPage + 5);
  };

  const prevPage = () => {
    setStartPage((prev) => prev - 5);
    setPageIndex(startPage - 5);
  };

  useEffect(() => {
    console.log(startPage, pageIndex);
  }, [startPage, pageIndex]);

  return (
    <S.Wrapper style={{ position: 'relative' }}>
      <T.SearchContainer>
        <T.SearchBarStyled
          placeholder="원하는 책 제목 혹은 저자를 검색해 보세요."
          onChangeText={(search: string) => setSearch(search)}
        />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={Search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>

      <T.ColumnStyled style={{ alignItems: 'center', justifyContent: 'center', flex: 1, width: '100%' }}>
        {totalResult === 0 ? (
          <NoSearch search={search} />
        ) : totalResult > 0 ? (
          <>
            <ScrollView
              ref={scrollViewRef}
              style={{ flex: 1, paddingLeft: 16, paddingRight: 16, position: 'relative' }}
            >
              <CustomText font="fontRegular" size="12px">
                검색결과 {totalResult}건
              </CustomText>
              {bookList.map((item, index) => (
                <SearchedBookList key={index} item={item} />
              ))}

              {/* 페이지 인덱스 */}
              <T.PageIndexRow>
                <TouchableOpacity onPress={prevPage}>
                  <T.MovePageImageStyled source={icons.leftEndPage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={movePageIndex(pageIndex - 1)}>
                  <T.MovePageImageStyled source={icons.leftPage} />
                </TouchableOpacity>
                {/* {Array.from({ length: totalPage }, (_, i) => i + 1).map((page, index) => (
                  <TouchableOpacity key={index} onPress={movePageIndex(page)}>
                    <T.PageIndexTextStyled selected={pageIndex === page}>{page}</T.PageIndexTextStyled>
                  </TouchableOpacity>
                ))} */}
                {new Array(5).fill('').map((item, index) => (
                  <TouchableOpacity key={index} onPress={movePageIndex(pageIndex)}>
                    <T.PageIndexTextStyled selected={pageIndex % 5 === index + 1}>
                      {index + pageIndex}
                    </T.PageIndexTextStyled>
                  </TouchableOpacity>
                ))}
                <TouchableOpacity onPress={movePageIndex(pageIndex + 1)}>
                  <T.MovePageImageStyled source={icons.rightPage} />
                </TouchableOpacity>
                <TouchableOpacity onPress={nextPage}>
                  <T.MovePageImageStyled source={icons.rightEndPage} />
                </TouchableOpacity>
              </T.PageIndexRow>
            </ScrollView>
            <View style={{ position: 'absolute', bottom: 80, right: 10, zIndex: 2 }}>
              <TouchableOpacity onPress={handleMoveTop}>
                <Image source={MoveTop} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
            </View>
            <S.NextButtonStyled
              style={{ height: 50, position: 'absolute', bottom: 10, zIndex: 1 }}
              onPress={movePage('initQuiz')}
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
