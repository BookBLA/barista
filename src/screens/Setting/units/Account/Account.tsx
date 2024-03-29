import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../commons/styles/variablesStyles';
import { useToggle } from '../../../../commons/hooks/useToggle';
import { Switch } from 'react-native-switch';
import * as S from '../../SettingStack.styles';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import useMovePage from '../../../../commons/hooks/useMovePage';
import Home from '../../../../../assets/images/icons/HomeBlack.png';

const Account = () => {
  const { toggle, isOpen } = useToggle();
  const { movePage } = useMovePage();
  useHeaderControl({
    title: '계정',
    right: {
      image: Home,
      onPress: movePage('tapScreens'),
    },
  });

  return (
    <S.BottomWrapper>
      <CustomText margin="16px 0">로그아웃</CustomText>
      <CustomText margin="16px 0">회원정보 수정</CustomText>
      <S.BetweenWrapper>
        <CustomText margin="16px 0">매칭 활성화</CustomText>
        <Switch
          value={isOpen}
          onValueChange={toggle}
          circleSize={16}
          barHeight={20}
          circleBorderWidth={0}
          backgroundActive={colors.primary}
          backgroundInactive={colors.buttonAuthToggle}
          circleActiveColor={'#fff'}
          circleInActiveColor={'#fff'}
          renderActiveText={false}
          renderInActiveText={false}
          switchLeftPx={3}
          switchRightPx={3}
          switchWidthMultiplier={2}
        />
      </S.BetweenWrapper>
      <S.BetweenWrapper>
        <S.RowWrapper>
          <CustomText margin="16px 5px 0 0">회원 탈퇴</CustomText>
        </S.RowWrapper>
        <CustomText margin="16px 5px 0 0" color={colors.textGray2} size="12px">
          회원 탈퇴 시, 계정 복구가 어렵습니다.
        </CustomText>
      </S.BetweenWrapper>
    </S.BottomWrapper>
  );
};

export default Account;
