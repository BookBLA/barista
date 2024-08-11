import * as S from './Header.styles';
import LogoDarkBg from '../../../../../../../assets/images/logos/logoDarkBg.png';
import useMovePage from '../../../../../../commons/hooks/navigations/movePage/useMovePage';
import { icons, logos } from '../../../../../../commons/utils/ui/variablesImages/variablesImages';
import useFetchMemberPostcard from '../../../../../../commons/hooks/datas/MemberPostcard/useMemberPostcard';
import { useGetAlarms } from '../../../../../../commons/hooks/notifications/getAlarms/useGetAlarms';

const Header = () => {
  const { movePage } = useMovePage();
  const { memberPostcard } = useFetchMemberPostcard();
  const { data } = useGetAlarms();

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.LogoImage source={LogoDarkBg} />
        <S.LogoTitleImage source={logos.mainLogo} />
      </S.LogoWrapper>
      <S.IconWrapper>
        <S.IconButton onPress={movePage('product')}>
          <S.IconImage source={icons.bookmarkAdd} />
        </S.IconButton>
        <S.IconText>{memberPostcard}</S.IconText>
        <S.IconButton onPress={movePage('notice')}>
          <S.IconImage source={data.length ? icons.bellOn : icons.bellOff} />
        </S.IconButton>
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
