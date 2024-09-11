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
import React, { useState } from 'react';
import { Image, Text } from 'react-native';
import * as S from '../../InitUserInfo.styles';
import ModalContent from './units/BirthSelect/ModalContent';
import ModalTitle from './units/BirthSelect/ModalTitle';

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
      {/* <TitleProgress gauge={75} /> */}
      <S.ColumnStyled style={{ marginTop: '34%', justifyContent: 'center', height: 'auto' }}>
        <S.ViewStyled style={{ marginBottom: 95 }}>
          <S.ContentStyled style={{ textAlign: 'center', marginBottom: 8 }}>성별을 선택해 주세요.</S.ContentStyled>
          <Text
            style={{
              color: colors.textGray2,
              fontFamily: 'fontLight',
              fontSize: 12,
              textAlign: 'center',
              marginBottom: 20,
            }}
          >
            프로필 확인 후 거짓 사실이 확인되면{'\n'}
            <Text style={{ color: colors.textGray2, fontFamily: 'fontBold' }}>영구정지 처리 및 불이익</Text>이 발생할 수
            있습니다.
          </Text>
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
          <S.MoveButton onPress={movePage('insertInviteCode')}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default GenderBirth;
