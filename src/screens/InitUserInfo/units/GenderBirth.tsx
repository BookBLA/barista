import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { Image, Text, View } from 'react-native';
import nextButton from '../../../../assets/images/buttons/nextButton.png';
import { CustomModal } from '../../../commons/components/CustomModal/CustomModal';
import { useToggle } from '../../../commons/hooks/useToggle';
import { useUserStore } from '../../../commons/store/useUserinfo';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';
import notYetNextButton from '../../../../assets/images/buttons/NotYetNextButton.png';
import ModalTitle from './ModalTitle';
import ModalContent from './ModalContent';
import useScreenLogger from '../../../commons/hooks/useAnalyticsScreenLogger';

const GenderBirth = () => {
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
      <S.ColumnStyled>
        <View>
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
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
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
        </View>
        <CustomModal modalConfig={modalConfig} />
        <View
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
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default GenderBirth;
