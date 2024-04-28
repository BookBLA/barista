import * as S from './Header.styles';
import LogoDarkBg from '../../../../../../../assets/images/logos/logoDarkBg.png';
import useMovePage from '../../../../../../commons/hooks/useMovePage';
import { icons, logos } from '../../../../../../commons/utils/variablesImages';
import useFetchMemberPostcard from '../../../../../../commons/hooks/useMemberPostcar';

const Header = () => {
  const { movePage } = useMovePage();
  const { memberPostcard } = useFetchMemberPostcard();

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoImage source={LogoDarkBg} />
        <S.LogoTitleImage source={logos.mainLogo} />
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
