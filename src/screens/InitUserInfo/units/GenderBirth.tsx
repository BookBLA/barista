import React, { useEffect, useState } from 'react';
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
import notYetNextButton from '../../../../assets/images/icons/NotYetNextButton.png';

const GenderBirth = () => {
  const [isSelect, setSelect] = useState<null | boolean>(null);
  const [date, setDate] = useState(new Date());
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  // console.log(date);
  // console.log(userInfo.birthDate);
  useEffect(() => {
    genderSelect();
  }, []);
  const genderSelect = () => {
    if (userInfo.gender === '여성') {
      setSelect(true);
    } else if (userInfo.gender === '남성') {
      setSelect(false);
    }
  };
  const { isOpen, toggle } = useToggle();
  const dateSelect = () => {
    setDate(date);
    const dateString = date.toISOString();
    updateUserInfo('birthDate', dateString.slice(0, 10));
    toggle();
  };

  const modalConfig = {
    visible: isOpen, // 모달 온오프 상태관리 변수입니다. // 필수값
    onClose: toggle, // 모달 온오프 관리하는 함수입니다. // 필수값
    close: true, // 우측 상단 x 버튼 표시 유무 입니다. // 선택값
    mode: 'round', // 모달 하단에 버튼 표시 유무 arrow 모드, round모드가 있습니다. // 선택값
    buttons: [
      { label: '취소', action: toggle, color: 'black', bgColor: colors.buttonMain },
      { label: '확인', action: dateSelect, color: colors.secondary },
    ],
    // 모달 하단에 버탠의 갯수 최대 2개  // mode 속성 등록 시에만 필수값 입니다.
    // label: 선택, action: 필수, color: 선택, bgColor: 선택
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={25} />
      <S.ColumnStyled>
        <View>
          <S.ContentStyled>성별을 선택해 주세요.</S.ContentStyled>
          <S.RowStyled>
            <S.BooleanButtonStyled
              isSelect={isSelect}
              onPress={() => {
                setSelect(true);
                updateUserInfo('gender', '여성');
                console.log('gender 여성');
                console.log(userInfo.gender);
              }}
            >
              <S.ButtonTextStyled isSelect={isSelect} onPress={() => setSelect(true)}>
                여성
              </S.ButtonTextStyled>
            </S.BooleanButtonStyled>
            <S.BooleanButtonStyled
              isSelect={isSelect === false}
              onPress={() => {
                setSelect(false);
                updateUserInfo('gender', '남성');
                console.log('gender 남성');
                console.log(userInfo.gender);
              }}
            >
              <S.ButtonTextStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
                남성
              </S.ButtonTextStyled>
            </S.BooleanButtonStyled>
          </S.RowStyled>
        </View>
        <View style={{ width: '100%', alignItems: 'center' }}>
          <S.ContentStyled>생년월일을 선택해 주세요.</S.ContentStyled>
          <S.ButtonStyled onPress={toggle}>
            {userInfo.birthDate === '' ? (
              <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>YYYY/MM/DD</Text>
            ) : (
              <Text style={{ color: colors.primary, fontFamily: 'fontMedium' }}>{userInfo.birthDate}</Text>
            )}
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
