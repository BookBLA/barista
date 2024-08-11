import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import prevButton from '../../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { useToggle } from '../../../commons/hooks/utils/toggle/useToggle';
import { useUserStore } from '../../../commons/store/useUserinfo';
import useMovePage from '../../../commons/hooks/navigations/movePage/useMovePage';
import { TitleProgress } from './TitleProgress';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import ModalTitle from './components/BirthSelect/ModalTitle';
import ModalContent from './components/BirthSelect/ModalContent';
import useScreenLogger from '../../../commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '../../../commons/hooks/ui/headerControl/useHeaderControl';
import { CustomModal } from '../../../commons/components/Layouts/CustomModal/CustomModal';

const GenderBirth = () => {
  useHeaderControl({
    title: '정보 입력',
    left: false,
  });
  useScreenLogger();
  const { isOpen, toggle } = useToggle();
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [date, setDate] = useState(new Date('2000-01-01'));

  console.log('userInfo', userInfo);

  const dateSelect = () => {
    const dateString = date.toISOString().slice(0, 10);
    updateUserInfo({ birthDate: dateString });
    toggle();
  };

  const modalConfig = {
    title: <ModalTitle />,
    visible: isOpen,
    onClose: toggle,
    close: true,
    mode: 'round',
    contents: <ModalContent date={date} setDate={setDate} />,
    buttons: [
      { label: '취소', action: toggle, color: 'black', bgColor: colors.buttonMain },
      { label: '확인', action: dateSelect, color: colors.secondary },
    ],
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={25} />
      <S.ColumnStyled style={{ height: '70%' }}>
        <S.ViewStyled>
          <S.ContentStyled style={{ textAlign: 'center' }}>성별을 선택해 주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === 'FEMALE'}
              onPress={() => updateUserInfo({ gender: 'FEMALE' })}
            >
              <S.ButtonTextStyled isSelect={userInfo.gender === 'FEMALE'}>여성</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === 'MALE'}
              onPress={() => updateUserInfo({ gender: 'MALE' })}
            >
              <S.ButtonTextStyled isSelect={userInfo.gender === 'MALE'}>남성</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </S.ViewStyled>
        <S.ViewStyled>
          <S.ContentStyled>생년월일을 선택해 주세요.</S.ContentStyled>
          <S.ButtonStyled onPress={toggle}>
            <Text
              style={{
                color: userInfo.birthDate === '' ? colors.textGray2 : colors.primary,
                fontFamily: 'fontMedium',
              }}
            >
              {userInfo.birthDate === '' ? 'YYYY/MM/DD' : userInfo.birthDate}
            </Text>
          </S.ButtonStyled>
        </S.ViewStyled>
        <CustomModal modalConfig={modalConfig} />
      </S.ColumnStyled>
      {/* <View
        style={{
          flexDirection: 'row',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          width: '85%',
          height: '7%',
        }}
      >
        {userInfo.gender === '' || userInfo.birthDate === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('namePhone')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </View> */}
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {userInfo.gender === '' || userInfo.birthDate === '' ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={movePage('namePhone')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default GenderBirth;
