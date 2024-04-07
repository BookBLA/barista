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
import { useRef, useState } from 'react';
import useManageMargin from '../../../commons/hooks/useManageMargin';
import { getSearchBookApi } from '../../../commons/api/searchBook';

const SearchBook = () => {
  const [search, setSearch] = useState('');
  const { movePage } = useMovePage();

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
    console.log('SearchBook');
    callGetSearchBookApi();
  };

  const callGetSearchBookApi = async () => {
    try {
      console.log('callGetSearchBookApi', search);
      const response = await getSearchBookApi(search);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <S.Wrapper>
      <T.SearchContainer>
        <T.SearchBarStyled placeholder="원하는 책 제목 혹은 저자를 검색해 보세요." onChangetext={setSearch} />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={Search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>
      {/* <S.NextButtonStyled style={{ height: 50, position: 'absolute' }} onPress={movePage()}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
      </S.NextButtonStyled> */}
      <View style={{ position: 'absolute', bottom: 80, right: 10, zIndex: 2 }}>
        <TouchableOpacity onPress={handleMoveTop}>
          <Image source={MoveTop} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
      </View>
      <T.ColumnStyled style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <CustomText font="fontRegular" size="12px">
            검색결과 {}건
          </CustomText>
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
          <SearchedBookList />
        </ScrollView>

        {/* <>
          <View style={{ width: '100%', alignItems: 'center', position: 'absolute' }}>
            <S.NextButtonStyled style={{ height: 50 }} onPress={movePage()}>
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
            </S.NextButtonStyled>
          </View>
        </> */}
        {/* <NoSearch /> */}
      </T.ColumnStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
