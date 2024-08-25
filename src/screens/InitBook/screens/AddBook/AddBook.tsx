import { FavBookList } from '@commons/components/Lists/FavBookList/FavBookList';
import { DashDividerLine } from '@commons/components/Utils/DashDividerLine/DashDividerLine';
import { LightText } from '@commons/components/Utils/TextComponents/LightText/LightText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { colors } from '@commons/styles/variablesStyles';
import { MemberBookReadResponse } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { useRoute } from '@react-navigation/native';
import * as T from '@screens/InitBook/InitBookStack.styles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import React from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EBook, TProps } from './AddBook.types';
import { useFetchMemberBook } from './hooks/useFetchMemberBook';

const AddBook = () => {
  useScreenLogger();
  useManageMargin();
  const route = useRoute<TProps>();
  const { movePage, handleReset } = useMovePage();
  const { data, fetchGetMemberBook } = useFetchMemberBook();
  const dataLength = data.length;
  const resetParams = route.params?.isStylePage ? { screen: 'Home' } : { screen: 'Library' };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>책 추가</S.TitleStyled>
      </S.SafeAreaViewStyled>

      <ScrollView style={{ width: '100%' }}>
        <S.ColumnStyled style={{ justifyContent: 'flex-start', height: '100%' }}>
          <View style={{ height: '25%', alignItems: 'center', margin: '10%' }}>
            <Text style={{ color: 'black', fontFamily: 'fontMedium', fontSize: 16, marginBottom: 14 }}>
              내가 좋아하는 책
            </Text>
            <S.RowStyled style={{ width: 'auto', marginBottom: 7 }}>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>첫 번째 책</Text>
              <LightText>이 나의</LightText>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}> 대표 책</Text>
              <LightText>으로 등록됩니다.</LightText>
            </S.RowStyled>
            <Text style={{ color: colors.textGray, fontFamily: 'fontLight', fontSize: 14 }}>
              책은 최대 3권까지 추가할 수 있습니다.
            </Text>
            <S.RowStyled style={{ width: 'auto', marginBottom: 7, marginTop: 7 }}>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>책 1권당</Text>
              <LightText> 엽서를</LightText>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}> 2개씩</Text>
              <LightText> 드립니다.</LightText>
            </S.RowStyled>
          </View>
          <>
            {data.map((item: MemberBookReadResponse, index) => (
              <React.Fragment key={index}>
                {index === EBook.FirstBookIndex ? (
                  <>
                    <FavBookList representative fetchGetMemberBook={fetchGetMemberBook} item={item} />
                    <DashDividerLine />
                  </>
                ) : (
                  <FavBookList fetchGetMemberBook={fetchGetMemberBook} item={item} />
                )}
              </React.Fragment>
            ))}

            {!dataLength && <DashDividerLine />}
            {dataLength < EBook.MaxBooks && (
              <T.ButtonStyled onPress={movePage('searchBook', { isRepresentative: !dataLength })}>
                <Image source={icons.plusCircle} style={{ width: 29, height: 28 }} />
              </T.ButtonStyled>
            )}
          </>
        </S.ColumnStyled>
      </ScrollView>
      <S.NextButtonStyled onPress={() => handleReset('tapScreens', resetParams)}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>완료</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default AddBook;
