import * as S from './Header.styles';
import LogoDarkBg from '../../../../../../../assets/images/logos/logoDarkBg.png';
import useMovePage from '../../../../../../commons/hooks/useMovePage';
import { icons } from '../../../../../../commons/utils/variablesImages';
import useFetchMemberPostcard from '../../../../../../commons/hooks/useMemberPostcar';

// Todo: 공통헤더로 분리예정
const Header = () => {
  const { movePage } = useMovePage();
  const { memberPostcard } = useFetchMemberPostcard();

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoImage source={LogoDarkBg} />
        <S.LogoTitle>BOOK BLA</S.LogoTitle>
      </S.LogoWrapper>
      <S.IconWrapper>
        <S.IconButton onPress={movePage('product')}>
          <S.IconImage source={icons.postcard} />
        </S.IconButton>
        <S.IconText>{memberPostcard}</S.IconText>
        <S.IconButton onPress={movePage('notice')}>
          <S.IconImage source={icons.bellOn} />
        </S.IconButton>
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;