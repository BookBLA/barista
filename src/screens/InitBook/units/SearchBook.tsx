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

const SearchBook = () => {
  const { movePage } = useMovePage();
  const SearchBook = () => {
    console.log('SearchBook');
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%' }}>
        <TouchableOpacity onPress={movePage()}>
          <Image source={backArrow} style={{ width: 24, height: 24, marginLeft: 14 }} />
        </TouchableOpacity>
        <View
          style={{
            width: '80%',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            height: 'auto',
          }}
        >
          <S.TitleStyled>내 서재</S.TitleStyled>
        </View>
      </View>
      <T.SearchContainer>
        <T.SearchBarStyled placeholder="원하는 책 제목 혹은 저자를 검색해 보세요." />
        <TouchableOpacity onPress={SearchBook}>
          <Image source={Search} style={{ width: 20, height: 20 }} />
        </TouchableOpacity>
      </T.SearchContainer>
      <T.ColumnStyled style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
        {/* <ScrollView style={{ flex: 1 }}>
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

        <>
          <View style={{ width: '100%', marginBottom: 32, alignItems: 'flex-end', backgroundColor: 'teal' }}>
            <TouchableOpacity>
              <Image source={MoveTop} style={{ width: 45, height: 45 }} />
            </TouchableOpacity>
          </View>

          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.NextButtonStyled style={{ height: 50 }} onPress={movePage()}>
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
            </S.NextButtonStyled>
          </View>
        </> */}
        <NoSearch />
      </T.ColumnStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
