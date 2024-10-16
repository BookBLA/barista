import { postSendbird } from '@commons/api/auth/login.api';
import { postMemberStatusesApi } from '@commons/api/members/default/member.api';
import { FavBookList } from '@commons/components/Lists/FavBookList/FavBookList';
import { DashDividerLine } from '@commons/components/Utils/DashDividerLine/DashDividerLine';
import { LightText } from '@commons/components/Utils/TextComponents/LightText/LightText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { colors } from '@commons/styles/variablesStyles';
import { EMemberStatus } from '@commons/types/memberStatus';
import { MemberBookReadResponse } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as T from '@screens/InitBook/InitBookStack.styles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { useConnection } from '@sendbird/uikit-react-native';
import React, { useEffect } from 'react';
import { Image, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { EBook } from './AddBook.types';
import { useFetchMemberBook } from './hooks/useFetchMemberBook';

const AddBook = () => {
  useScreenLogger();
  useAppUIManager();
  const { movePage, handleReset } = useMovePage();
  const { data, fetchGetMemberBook } = useFetchMemberBook();
  const { updateMemberInfo } = useMemberStore();
  const setToken = useAuthStore((state) => state.setToken);
  const { connect } = useConnection();
  const dataLength = data.length;

  const nextPage = async () => {
    try {
      await postMemberStatusesApi({ memberStatus: 'APPROVAL' });
      updateMemberInfo('memberStatus', EMemberStatus.APPROVAL);
      handleReset('tapScreens');
    } catch (error) {
      console.log('ERROR) postMemberStatusesApi', error);
    }
  };

  useEffect(() => {
    const setSendbirdToken = async () => {
      const sendbirdResponse = await postSendbird();
      if (sendbirdResponse.result.memberId) {
        setToken({ sendbird: sendbirdResponse.result.sendbirdToken });
        await connect(String(sendbirdResponse.result.memberId), { accessToken: sendbirdResponse.result.sendbirdToken });
      }
    };
    setSendbirdToken().then(() => {
      console.debug('SendbirdToken Issuance successfully.');
    });
  }, []);

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>책 추가</S.TitleStyled>
      </S.SafeAreaViewStyled>

      <ScrollView style={{ width: '100%' }}>
        <S.ColumnStyled style={{ justifyContent: 'flex-start', height: '100%' }}>
          <View style={{ alignItems: 'center', marginTop: '10%', marginBottom: 41 }}>
            <Text style={{ color: 'black', fontFamily: 'fontMedium', fontSize: 16, marginBottom: 14 }}>
              내가 좋아하는 책
            </Text>
            <LightText margin="7px"> 좋아하는 책들을 등록해주세요!</LightText>
            <S.RowStyled style={{ width: 'auto', marginBottom: 7 }}>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>첫 4권</Text>
              <LightText>을 등록하시면</LightText>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}> 매칭에 필요한</Text>
            </S.RowStyled>
            <S.RowStyled style={{ width: 'auto' }}>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>책갈피</Text>
              <LightText>를 드려요! (</LightText>
              <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>15,000원</Text>
              <LightText>상당)</LightText>
            </S.RowStyled>
          </View>
          <>
            {data.map((item: MemberBookReadResponse) => (
              <React.Fragment key={item.memberBookId}>
                <FavBookList fetchGetMemberBook={fetchGetMemberBook} item={item} />
              </React.Fragment>
            ))}

            {!dataLength && <DashDividerLine />}
            {dataLength < EBook.MaxBooks && (
              <T.ButtonStyled onPress={movePage('searchBook')}>
                <Image source={icons.plusCircle} style={{ width: 29, height: 28 }} />
              </T.ButtonStyled>
            )}
          </>
        </S.ColumnStyled>
      </ScrollView>
      <S.NextButtonStyled
        onPress={nextPage}
        disabled={dataLength === 0}
        style={{ backgroundColor: dataLength === 0 ? colors.buttonNavStroke : colors.primary }}
      >
        <Text
          style={{
            color: dataLength === 0 ? colors.textGray2 : colors.secondary,
            fontFamily: 'fontMedium',
            fontSize: 16,
          }}
        >
          완료
        </Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default AddBook;
