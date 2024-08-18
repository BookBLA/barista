import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { useState } from 'react';
import { Image, View } from 'react-native';

const SelectProfile = () => {
  useHeaderControl({
    title: '스타일',
    left: false,
  });
  useManageMargin();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const { movePage, handleReset } = useMovePage();
  const [profile, setProfile] = useState('');

  return (
    <S.Wrapper>
      {/* <TitleProgress gauge={83} /> */}
      <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
        <S.ContentStyled style={{ marginBottom: 38, marginTop: 30 }}>프로필 사진을 선택해 주세요</S.ContentStyled>
      </View>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {profile === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={handleReset('initBookStack')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};
export default SelectProfile;
