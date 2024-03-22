import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitBook.styles';
import { Text, TouchableOpacity, View, Image } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import backArrow from '../../../../assets/images/icons/BackArrow.png';

const SearchBook = () => {
  const { movePage } = useMovePage();

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

      <S.NextButtonStyled onPress={movePage()}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
