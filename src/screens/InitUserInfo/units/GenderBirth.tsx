import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import nextButton from '../../../../assets/images/icons/nextButton.png';
import { CustomModal } from '../../../commons/components/CustomModal/CustomModal';
import { useToggle } from '../../../commons/hooks/useToggle';
import DatePicker from 'bamb14';
import { useUserStore } from '../../../commons/store/useUserinfo';
import useMovePage from '../../../commons/hooks/useMovePage';
import { TitleProgress } from './TitleProgress';

const GenderBirth = () => {
  const { isOpen, toggle } = useToggle();
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [date, setDate] = useState(new Date());

  console.log('userInfo', userInfo);

  const dateSelect = () => {
    const dateString = date.toISOString().slice(0, 10);
    updateUserInfo('birthDate', dateString);
    toggle();
  };

  const modalConfig = {
    visible: isOpen,
    onClose: toggle,
    close: true,
    mode: 'round',
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
          <S.ContentStyled>성별을 선택해 주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === '여성'}
              onPress={() => updateUserInfo('gender', '여성')}
            >
              <S.ButtonTextStyled>여성</S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={userInfo.gender === '남성'}
              onPress={() => updateUserInfo('gender', '남성')}
            >
              <S.ButtonTextStyled>남성</S.ButtonTextStyled>
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
          <CustomModal modalConfig={modalConfig}>
            <S.RowStyled style={{ justifyContent: 'flex-start' }}>
              <Text
                style={{
                  color: 'black',
                  fontFamily: 'fontMedium',
                  fontSize: 16,
                  justifyContent: 'flex-start',
                }}
              >
                생년월일을 설정해 주세요.
              </Text>
            </S.RowStyled>
            <View style={{ marginBottom: 43, marginTop: 27 }}>
              <DatePicker
                value={date}
                onChange={(value) => setDate(value)}
                format="yyyy-mm-dd"
                startYear={1980}
                endYear={2024}
                markWidth={97}
              />
            </View>
          </CustomModal>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%', height: '10%' }}>
          {/* {userInfo.gender === '' || userInfo.birthDate === '' ? (
            <Image source={notYetNextButton} />
          ) : (
            <TouchableOpacity onPress={movePage('namePhone')}>
              <Image source={nextButton} />
            </TouchableOpacity>
          )} */}
          <TouchableOpacity onPress={movePage('namePhone')}>
            <Image source={nextButton} />
          </TouchableOpacity>
        </View>
      </S.ColumnStyled>
    </S.Wrapper>
  );
};

export default GenderBirth;
