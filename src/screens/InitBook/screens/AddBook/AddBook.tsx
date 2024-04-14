import useMovePage from '../../../../commons/hooks/useMovePage';
import * as S from '../../../InitUserInfo/InitUserInfo.styles';
import * as T from '../../InitBook.styles';
import { Text, Image, View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import React, { useEffect, useState } from 'react';
import { FavBookList } from '../../../../commons/components/FavBookList/FavBookList';
import { ModifyTitleBar } from '../../../../commons/components/ModifyTitleBar/ModifyTitleBar';
import { DashDividerLine } from '../../../../commons/components/DashDividerLine/DashDividerLine';
import { ScrollView } from 'react-native-gesture-handler';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import { IResponseMemberBook, Props } from '../../InitBook.types';
import { getMemberBookApi } from '../../../../commons/api/memberBook.api';
import { icons } from '../../../../commons/utils/variablesImages';

const AddBook: React.FC<Props> = ({ route }) => {
  useManageMargin();
  const isModify = route.params?.isModify;
  const { movePage } = useMovePage();
  const [data, setData] = useState([]);

  const fetchGetMemberBook = async () => {
    try {
      const response = await getMemberBookApi();
      setData(response.result?.memberBookReadResponses);
      console.log('fetchGetMemberBook', response.result?.memberBookReadResponses);
    } catch (err) {
      console.log('ErrfetchGetMemberBook', err);
    }
  };

  useEffect(() => {
    fetchGetMemberBook();
  }, []);

  return (
    <S.Wrapper>
      {isModify ? (
        <ModifyTitleBar step={2} />
      ) : (
        <S.SafeAreaViewStyled>
          <S.TitleStyled>내 서재</S.TitleStyled>
        </S.SafeAreaViewStyled>
      )}
      <ScrollView style={{ width: '100%' }}>
        <S.ColumnStyled style={{ justifyContent: 'flex-start', height: '100%' }}>
          <View style={{ height: '13%', alignItems: 'center', margin: '10%' }}>
            <Text style={{ color: 'black', fontFamily: 'fontMedium', fontSize: 16, marginBottom: 14 }}>
              내가 좋아하는 책
            </Text>
            <S.RowStyled style={{ width: 'auto', marginBottom: 7 }}>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>첫 번째 책</Text>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontLight', fontSize: 14 }}>이 나의</Text>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}> 대표 책</Text>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontLight', fontSize: 14 }}>으로 등록됩니다.</Text>
            </S.RowStyled>
            <Text style={{ color: colors.textGray, fontFamily: 'fontLight', fontSize: 14 }}>
              책은 최대 3권까지 추가할 수 있습니다.
            </Text>
          </View>
          <>
            {data.map((item: IResponseMemberBook, index) => (
              <React.Fragment key={index}>
                {index === 0 ? (
                  <>
                    <FavBookList
                      representative
                      memberBookId={item?.memberBookId}
                      imageUrl={item.thumbnail}
                      fetchGetMemberBook={fetchGetMemberBook}
                    />
                    <DashDividerLine />
                  </>
                ) : (
                  <FavBookList
                    memberBookId={item?.memberBookId}
                    imageUrl={item.thumbnail}
                    fetchGetMemberBook={fetchGetMemberBook}
                  />
                )}
              </React.Fragment>
            ))}

            {!data.length && <DashDividerLine />}
            {data.length < 3 && (
              <T.ButtonStyled onPress={movePage('searchBook')}>
                <Image source={icons.plusCircle} style={{ width: 29, height: 28 }} />
              </T.ButtonStyled>
            )}
          </>
        </S.ColumnStyled>
      </ScrollView>
      {/* {isActivate === false ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={movePage('tapScreens')}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      )} */}
      <S.NextButtonStyled onPress={movePage('tapScreens')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default AddBook;
