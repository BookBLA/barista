import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import { colors } from '@commons/styles/variablesStyles';
import { useState } from 'react';
import { Image, Text, View } from 'react-native';
import * as S from '../../InitUserInfo.styles';
import ModalContent from './units/searchSchool/ModalContent';
import ModalTitle from './units/searchSchool/ModalTitle';

const SchoolStudentID = () => {
  useHeaderControl({
    title: '학교 입력',
    left: false,
  });
  const { isOpen, toggle } = useToggle();

  useScreenLogger();
  const { userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [school, setSchool] = useState('');

  const moveNext = async () => {
    movePage('emailAuth')();
  };

  const modalConfig = {
    title: <ModalTitle />,
    visible: isOpen,
    onClose: toggle,
    close: true,
    mode: 'round',
    contents: <ModalContent school={school} setSchool={setSchool} toggle={toggle} />,
  };

  return (
    <S.Wrapper>
      <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
        <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
        <S.ButtonStyled onPress={toggle}>
          <Text
            style={{
              color: userInfo.schoolName === '' ? colors.textGray2 : colors.primary,
              fontFamily: 'fontMedium',
            }}
          >
            {userInfo.schoolName === '' ? '학교' : userInfo.schoolName}
          </Text>
        </S.ButtonStyled>
        <CustomModal modalConfig={modalConfig} />
      </View>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {userInfo.schoolName === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={moveNext}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default SchoolStudentID;
