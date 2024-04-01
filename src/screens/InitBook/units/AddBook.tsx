import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitBook.styles';
import { Text, Image, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import plusCircle from '../../../../assets/images/icons/PlusCircle.png';
import { useState } from 'react';
import { FavBookList } from '../../../commons/components/FavBookList/FavBookList';
import { deviceHeight, deviceWidth } from '../../../commons/utils/dimensions';
import Dash from 'react-native-dash';
import { ModifyTitleBar } from '../ModifyTitleBar';

const AddBook = () => {
  const { movePage } = useMovePage();
  const [isActivate, setIsActivate] = useState<boolean>(false);
  const [isModify, setIsModify] = useState<boolean>(false);

  return (
    <S.Wrapper>
      {isModify ? (
        <ModifyTitleBar step={2} />
      ) : (
        <S.SafeAreaViewStyled>
          <S.TitleStyled>내 서재</S.TitleStyled>
        </S.SafeAreaViewStyled>
      )}
      {/* <ModifyTitleBar /> */}
      <S.ColumnStyled style={{ justifyContent: 'flex-start', height: '80%', width: deviceWidth }}>
        <View style={{ height: '13%', alignItems: 'center', margin: '10%' }}>
          <Text style={{ color: 'black', fontFamily: 'fontMedium', fontSize: 16, marginBottom: 14 }}>
            내가 좋아하는 책
          </Text>
          <S.RowStyled style={{ width: 'auto', marginBottom: 7 }}>
            <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>첫 번째 책</Text>
            <Text style={{ color: colors.textGray3, fontFamily: 'fontLight', fontSize: 14 }}>이 나의</Text>
            <Text style={{ color: colors.textGray3, fontFamily: 'fontBold', fontSize: 14 }}>대표 책</Text>
            <Text style={{ color: colors.textGray3, fontFamily: 'fontLight', fontSize: 14 }}>으로 등록됩니다.</Text>
          </S.RowStyled>
          <Text style={{ color: colors.textGray, fontFamily: 'fontLight', fontSize: 14 }}>
            책은 최대 3권까지 추가할 수 있습니다.
          </Text>
        </View>
        <>
          <FavBookList />

          <Dash
            style={{
              width: '85%',
              height: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              marginBottom: 20,
              marginTop: 20,
            }}
            dashGap={5}
            dashLength={5}
            dashThickness={1.5}
            dashColor={colors.lineDivider}
          />
          <T.ButtonStyled onPress={movePage('searchBook')}>
            <Image source={plusCircle} style={{ width: 29, height: 28 }} />
          </T.ButtonStyled>
        </>
      </S.ColumnStyled>
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
