import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useFetchMemberPostcard from '@commons/hooks/datas/MemberPostcard/useMemberPostcard';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { useGetAlarms } from '@commons/hooks/notifications/getAlarms/useGetAlarms';
import { icons, logos } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Header.styles';

const Header = () => {
  const { movePage } = useMovePage();
  const { memberPostcard } = useFetchMemberPostcard();
  const { data } = useGetAlarms();

  return (
    <S.HeaderWrapper>
      <S.LogoWrapper>
        <S.IconButton>
          <S.LogoImage source={logos.logoLight02} />
        </S.IconButton>
        <S.LogoTitleImage source={logos.logoTitleLight} />
      </S.LogoWrapper>
      <S.IconWrapper>
        <S.IconButton onPress={movePage('product')}>
          <S.IconImage source={icons.bookmarkLightAdd} />
        </S.IconButton>
        <CustomText color="#fff" font="fontExtraLight" margin="0 8px 0 3px ">
          {memberPostcard}
        </CustomText>
        <S.IconButton onPress={movePage('notice')}>
          <S.IconImage source={data.length ? icons.bellLightOn : icons.bellLightOff} />
        </S.IconButton>
      </S.IconWrapper>
    </S.HeaderWrapper>
  );
};

export default Header;
