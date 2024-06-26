import React from 'react';
import { Text, Image, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import { FavBookList } from '../../../../commons/components/FavBookList/FavBookList';
import { DashDividerLine } from '../../../../commons/components/DashDividerLine/DashDividerLine';
import { ScrollView } from 'react-native-gesture-handler';
import { IResponseMemberBook } from '../../InitBookStack.types';
import { icons } from '../../../../commons/utils/variablesImages';
import { useFetchMemberBook } from './hooks/useFetchMemberBook';
import { LightText } from '../../../../commons/components/TextComponents/LightText/LightText';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitBookStack.styles';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import { EBook, TProps } from './AddBook.types';
import { useRoute } from '@react-navigation/native';

const AddBook = () => {
  useManageMargin();
  const route = useRoute<TProps>();
  const { movePage, handleReset } = useMovePage();
  const { data, fetchGetMemberBook } = useFetchMemberBook();
  const dataLength = data.length;
  const resetParams = route.params?.isStylePage ? { screen: 'Home' } : { screen: 'Library' };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>내 서재</S.TitleStyled>
      </S.SafeAreaViewStyled>

      <ScrollView style={{ width: '100%' }}>
        <S.ColumnStyled style={{ justifyContent: 'flex-start', height: '100%' }}>
          <View style={{ height: '13%', alignItems: 'center', margin: '10%' }}>
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
          </View>
          <>
            {data.map((item: IResponseMemberBook, index) => (
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
