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
import { getMemberProfileApi } from '../../../../commons/api/memberProfille.api';
import { useUserStore } from '../../../../commons/store/useUserinfo';

const Account = () => {
  const { movePage } = useMovePage();
  const { toggle, isOpen } = useToggle(); // 토글 훅 인스턴스1 // 스위치 관리 토글 훅
  const { toggle: modalToggle, isOpen: isOpenModal } = useToggle(); // 토글 훅 인스턴스2 // 모달 관리 토글 훅
  const { onClickLogout } = useLogout();
  const [selected, setSelected] = useState('');

  // config 재사용하기 위해 변수로 만듬
  const config = {
    title: '계정',
    right: {
      image: Home,
      onPress: movePage('tapScreens'),
    },
  };

  useHeaderControl(config);

  const modalConfig = {
    visible: isOpen || isOpenModal,
    onClose: isOpen ? toggle : modalToggle,
    mode: 'round',
    contents: isOpen ? <MatchingContent selected={selected} setSelected={setSelected} /> : <LogOutContent />,
    buttons: isOpen
      ? [{ label: '비활성화하기', action: toggle }]
      : [
          { label: '로그아웃', action: onClickLogout, bgColor: colors.buttonMain, color: 'black' },
          { label: '취소', action: modalToggle },
        ],
  };
  const { updateUserInfo, userInfo } = useUserStore();

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
      <CustomModal modalConfig={modalConfig}></CustomModal>
    </>
  );
};

export default Account;
