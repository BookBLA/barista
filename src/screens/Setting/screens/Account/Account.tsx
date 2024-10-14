import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomSwitch } from '@commons/components/Inputs/CustomSwitch/CustomSwitch';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useLogout } from '@commons/hooks/auths/logout/useLogout';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { colors } from '@commons/styles/variablesStyles';
import { EMemberStatus } from '@commons/types/memberStatus';
import * as S from '@screens/Setting/SettingStack.styles';
import { getHeaderConfig } from './configs/headerConfig';
import { getLogoutConfig } from './configs/logoutConfig';
import { getMatchingConfig } from './configs/matchingconfig';
import { useEnableMatching } from './hooks/useEnableMatching';
import { useNavigation } from '@react-navigation/native';

const Account = () => {
  useScreenLogger();
  const { movePage, handleReset } = useMovePage();
  const navigation = useNavigation<any>();
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const { toggle: matchingToggle, isOpen: isMatching } = useToggle();
  const { toggle: logoutToggle, isOpen: isLogout } = useToggle();
  const { onClickLogout } = useLogout(logoutToggle);
  const { selected, setSelected, reason, setReason, handleEnableMatching, onClickEnableMatching } =
    useEnableMatching(matchingToggle);

  // NOTE: 성진 - config 재사용하기 위해 변수로 만듬
  const headerConfig = getHeaderConfig(handleReset);

  useHeaderControl(headerConfig);

  // TODO: 더 좋은 방법이 있으면 변경 예정 ex) 커스텀 모달을 감싸는 컴포넌트를 만들기
  const matchingModalConfig = getMatchingConfig(
    handleEnableMatching,
    { isMatching, matchingToggle },
    {
      reason,
      setReason,
      selected,
      setSelected,
    },
  );

  const logoutModalConfig = getLogoutConfig(
    {
      isLogout,
      logoutToggle,
    },
    onClickLogout,
  );

  return (
    <>
      <S.BottomWrapper>
        <CustomText margin="16px 0" onPress={logoutToggle}>
          로그아웃
        </CustomText>
        <CustomText onPress={() => navigation.push('modifyStyle')} margin="16px 0">
          회원정보 수정
        </CustomText>
        <S.BetweenWrapper>
          <S.MatchWrapper>
            <CustomText>매칭 활성화</CustomText>
            <CustomText margin="0 3px" color={colors.textGray2} size="12px">
              학생증 인증 후 비활성화 할 수 있습니다
            </CustomText>
          </S.MatchWrapper>

          <CustomSwitch
            value={memberStatus !== EMemberStatus.MATCHING_DISABLED}
            onValueChange={onClickEnableMatching}
          />
        </S.BetweenWrapper>
        <S.BetweenWrapper>
          <S.RowWrapper>
            <CustomText margin="16px 5px 0 0" onPress={() => navigation.push('delete')}>
              회원 탈퇴
            </CustomText>
          </S.RowWrapper>
          <CustomText margin="16px 5px 0 0" color={colors.textGray2} size="12px">
            회원 탈퇴 시, 계정 복구가 어렵습니다
          </CustomText>
        </S.BetweenWrapper>
      </S.BottomWrapper>
      <CustomModal modalConfig={isMatching ? matchingModalConfig : logoutModalConfig} />
    </>
  );
};

export default Account;
