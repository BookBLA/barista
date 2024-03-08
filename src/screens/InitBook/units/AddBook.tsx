import useMovePage from '../../../commons/hooks/useMovePage';
import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { Text } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';

const AddBook = () => {
  const { movePage } = useMovePage();

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <Text style={{ color: 'black', fontFamily: 'fontMedium', fontSize: 16 }}>내가 좋아하는 책</Text>
      <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 14 }}>
        첫 번째 책이 나의 대표책으로 등록됩니다.
      </Text>
      <Text style={{ color: colors.textGray, fontFamily: 'fontMedium', fontSize: 14 }}>
        책은 최대 3권까지 추가할 수 있습니다.
      </Text>
      <S.NextButtonStyled onPress={movePage()}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default AddBook;
