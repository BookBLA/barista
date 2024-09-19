import Pagination from '@commons/components/Layouts/Pagination/Pagination';
import { SearchedBookList } from '@commons/components/Lists/SearchedBookList/SearchedBookList';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { CS_CENTTER_URL } from '@commons/contents/agreement/agreementUrls';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useLinkingOpen } from '@commons/hooks/navigations/linkingOpen/useLinkingOpen';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { useHandleMoveTop } from '@commons/hooks/ui/handleMoveTop/useHandleMoveTop';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import usePagination from '@commons/hooks/ui/pagination/usePagination';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { BookSearchResponse } from '@commons/types/openapiGenerator';
import { buttons, icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as T from '@screens/InitBook/InitBookStack.styles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useSearchBooks } from './hooks/useSearchBooks';
import { NoSearch } from './units/NoSearch';

const SearchBook = () => {
  useScreenLogger();
  useAppUIManager();
  useHeaderControl({
    title: '책 검색',
    left: true,
  });
  const handleLinkPress = useLinkingOpen();
  const { movePage } = useMovePage();
  const csLink = CS_CENTTER_URL;
  const { handleMoveTop, scrollViewRef } = useHandleMoveTop();
  const { pageIndex, startPage, totalPage, setTotalPage, movePageIndex, changePageGroup, nextEndPage, prevEndPage } =
    usePagination();
  const { bookList, resultSearch, callGetSearchBookApi } = useSearchBooks(setTotalPage);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState<BookSearchResponse>({});
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
              style={{
                flex: 1,
                paddingLeft: 16,
                paddingRight: 16,
                position: 'relative',
              }}
            >
              <T.searchResultTextArea>
                <CustomText font="fontRegular" size="12px">
                  검색결과 {totalPage}건
                </CustomText>
                <View style={{ flex: 1 }} />
                <CustomText font="fontRegular" size="12px" color="#A8AAB2">
                  찾는 책이 없다면{' '}
                </CustomText>
                <Text
                  onPress={handleLinkPress(csLink)}
                  style={{
                    color: colors.buttonPrimary,
                    fontSize: 12,
                    fontWeight: '500',
                    textDecorationLine: 'underline',
                  }}
                >
                  고객센터로 문의
                </Text>
                <CustomText font="fontReguler" size="12px" color="#A8AAB2">
                  해주세요!
                </CustomText>
              </T.searchResultTextArea>
              {bookList.map((item: BookSearchResponse, index) => (
                <SearchedBookList
                  key={`${item?.isbn ?? 'no-isbn'}-${item.imageUrl ?? index}`}
                  item={item}
                  isSelected={item.isbn === selectedBook?.isbn && item.imageUrl === selectedBook.imageUrl}
                  onSelectBook={setSelectedBook}
                />
              ))}
            </ScrollView>

            <View style={{ position: 'absolute', bottom: 95, right: 10, zIndex: 2 }}>
              <TouchableOpacity onPress={() => handleMoveTop()}>
                <Image source={buttons.moveTop} style={{ width: 45, height: 45 }} />
              </TouchableOpacity>
            </View>
            <Pagination
              pageIndex={pageIndex}
              startPage={startPage}
              totalPage={totalPage}
              movePageIndex={movePageIndex}
              changePageGroup={changePageGroup}
              prevEndPage={prevEndPage}
              nextEndPage={nextEndPage}
            />
            <S.NextButtonStyled
              style={{ height: 44, position: 'absolute', bottom: 10, zIndex: 1 }}
              onPress={movePage('initQuiz', { selectedBook })}
            >
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>등록하기</Text>
            </S.NextButtonStyled>
          </>
        ) : null}
      </T.ColumnStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
