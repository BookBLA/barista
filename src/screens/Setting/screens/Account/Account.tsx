import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../commons/styles/variablesStyles';
import { useToggle } from '../../../../commons/hooks/useToggle';
import { Switch } from 'react-native-switch';
import { useState } from 'react';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { useLogout } from '../../../../commons/hooks/useLogout';
import * as S from '../../SettingStack.styles';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import useMovePage from '../../../../commons/hooks/useMovePage';
import Home from '../../../../../assets/images/icons/HomeBlack.png';
import LogOutContent from './units/LogOutContent/LogOutContent';
import MatchingContent from './units/MatchingContent/MatchingContent';
import useMemberStore from '../../../../commons/store/useMemberStore';
import { EMemberStatus } from '../../../../commons/types/memberStatus';
import { postMemberStatusesApi } from '../../../../commons/api/member.api';

const Account = () => {
  // TODO: 성진 - 가독성 개선 예정
  const { movePage, handleReset } = useMovePage();
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);
  const { toggle, isOpen } = useToggle();
  const { toggle: modalToggle, isOpen: isOpenModal } = useToggle();
  const { onClickLogout } = useLogout();
  const [selected, setSelected] = useState('');
  const [reason, setReason] = useState('');

  // NOTE: 성진 - config 재사용하기 위해 변수로 만듬
  const config = {
    title: '계정',
    right: {
      image: Home,
      onPress: () => handleReset('tapScreens'),
    },
  };

  useHeaderControl(config);

  const modalConfig = {
    visible: isOpen || isOpenModal,
    onClose: isOpen ? toggle : modalToggle,
    mode: 'round',
    contents: isOpen ? (
      <MatchingContent reason={reason} setReason={setReason} selected={selected} setSelected={setSelected} />
    ) : (
      <LogOutContent />
    ),
    buttons: isOpen
      ? [{ label: '비활성화하기', action: () => callEnableMatching(EMemberStatus.MATCHING_DISABLED) }]
      : [
          {
            label: '로그아웃',
            action: () => {
              modalToggle();
              onClickLogout();
            },
            bgColor: colors.buttonMain,
            color: 'black',
          },
          { label: '취소', action: modalToggle },
        ],
  };

  const onClickEnableMatching = () => {
    if (EMemberStatus.COMPLETED === memberStatus) {
      toggle();
    } else {
      callEnableMatching(EMemberStatus.COMPLETED);
    }
  };

  const callEnableMatching = async (memberStatus: string) => {
    try {
      await postMemberStatusesApi({
        memberStatus,
        reason: memberStatus === EMemberStatus.COMPLETED ? '' : reason ?? selected,
      });
      updateMemberInfo('memberStatus', memberStatus);
    } catch (err) {
      console.log('err', err);
    } finally {
      if (memberStatus === EMemberStatus.MATCHING_DISABLED) {
        setReason('');
        setSelected('');
        toggle();
      }
    }
  };

  return (
    <>
      <S.BottomWrapper>
        <CustomText margin="16px 0" onPress={modalToggle}>
          로그아웃
        </CustomText>
        <CustomText onPress={movePage('modifyUserinfo')} margin="16px 0">
          회원정보 수정
        </CustomText>
        <S.BetweenWrapper>
          <CustomText margin="16px 0">매칭 활성화</CustomText>
          <Switch // TODO: 성진 - 커스텀 스위치 만들예정
            value={memberStatus === EMemberStatus.COMPLETED}
            onValueChange={onClickEnableMatching}
            circleSize={16}
            barHeight={20}
            circleBorderWidth={0}
            backgroundActive={colors.primary}
            backgroundInactive={colors.buttonAuthToggle}
            circleActiveColor="#fff"
            circleInActiveColor="#fff"
            renderActiveText={false}
            renderInActiveText={false}
            switchLeftPx={3}
            switchRightPx={3}
            switchWidthMultiplier={2}
          />
        </S.BetweenWrapper>
        <S.BetweenWrapper>
          <S.RowWrapper>
            <CustomText
              margin="16px 5px 0 0"
              onPress={movePage('delete', {
                config,
              })}
            >
              회원 탈퇴
            </CustomText>
          </S.RowWrapper>
          <CustomText margin="16px 5px 0 0" color={colors.textGray2} size="12px">
            회원 탈퇴 시, 계정 복구가 어렵습니다.
          </CustomText>
        </S.BetweenWrapper>
      </S.BottomWrapper>
      <CustomModal modalConfig={modalConfig} />
    </>
  );
};

export default Account;
