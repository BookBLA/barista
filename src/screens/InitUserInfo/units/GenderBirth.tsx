import React, { useState } from 'react';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { IProps } from '../../../commons/components/MbtiItem/MbtiItem.types';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import nextButton from '../../../../assets/images/icons/next_button.png';
import { CustomModal } from '../../../commons/components/CustomModal/CustomModal';
import { useToggle } from '../../../commons/hooks/useToggle';
import DatePicker from 'bamb14';
import { useUserStore } from '../../../commons/store/useUserinfo';
import useMovePage from '../../../commons/hooks/useMovePage';

const GenderBirth = ({ navigation }: { navigation: any }) => {
  const [isSelect, setSelect] = useState<null | boolean>(null);
  const [date, setDate] = useState(new Date());
  const { updateUserInfo } = useUserStore();
  const { movePage, handleNext } = useMovePage();
  const dateString = date.toISOString();
  console.log(dateString.slice(0, 10));

  const { isOpen, toggle } = useToggle();
  const dateSelect = () => {
    setDate(date);
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
      <S.SafeAreaViewStyled>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBar progress={25} />
      <S.ContentStyled style={{ marginTop: 90, marginBottom: 16 }}>성별을 선택해 주세요.</S.ContentStyled>
      <S.RowStyled>
        <S.BooleanButtonStyled isSelect={isSelect} onPress={() => setSelect(true)}>
          <S.ButtonTextStyled isSelect={isSelect} onPress={() => setSelect(true)}>
            여성
          </S.ButtonTextStyled>
        </S.BooleanButtonStyled>
        <S.BooleanButtonStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
          <S.ButtonTextStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
            남성
          </S.ButtonTextStyled>
        </S.BooleanButtonStyled>
      </S.RowStyled>
      <S.ContentStyled style={{ marginTop: 151, marginBottom: 16 }}>생년월일을 선택해 주세요.</S.ContentStyled>
      <S.ButtonStyled onPress={toggle}>
        {date === null ? (
          <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>YYYY/MM/DD</Text>
        ) : (
          <Text style={{ color: colors.primary, fontFamily: 'fontMedium' }}>{dateString.slice(0, 10)}</Text>
        )}
      </S.ButtonStyled>
      <CustomModal modalConfig={modalConfig}>
        <View style={{ marginBottom: 43, marginTop: 43 }}>
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
      <View style={{ flexDirection: 'row', justifyContent: 'flex-end', width: '80%', height: '10%' }}>
        <TouchableOpacity onPress={movePage('namePhone')}>
          <Image source={nextButton} style={{ width: 11 }} />
        </TouchableOpacity>
      </View>
    </S.Wrapper>
  );
};

export default GenderBirth;
