import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitBook.styles';
import { Text } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';

const SearchBook = () => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>내 서재</S.TitleStyled>
      </S.SafeAreaViewStyled>

      <S.NextButtonStyled onPress={movePage()}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>등록하기</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default SearchBook;
