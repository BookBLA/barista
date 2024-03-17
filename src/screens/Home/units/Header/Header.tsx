import * as S from './Header.styles';
import Postcard from '../../../../../assets/images/icons/Postcard.png';
import Notice from '../../../../../assets/images/icons/notice.png';
import LogoDarkBg from '../../../../../assets/images/logos/logoDarkBg.png';

const Header = () => {
  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoImage source={LogoDarkBg} />
        <S.LogoTitle>BOOK BLA</S.LogoTitle>
      </S.LogoWrapper>
      <S.IconWrapper>
        <S.IconImage source={Postcard} />
        <S.IconText>3</S.IconText>
        <S.IconImage source={Notice} />
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
