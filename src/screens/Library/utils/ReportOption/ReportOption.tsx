import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { View } from 'react-native';
import { colors } from '../../../../commons/styles/variablesStyles';
import React, { useState } from 'react';
import { reportCases } from '../../../../commons/contents/report/reportCases';
import Checkbox from 'expo-checkbox';
import { NextButtonStyled } from '../../../InitUserInfo/InitUserInfo.styles';
import { useToggle } from '../../../../commons/hooks/useToggle';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import ReportModalContent from '../ReportModalContent';
import { InputStyled } from './ReportOption.styles';

const ReportOption = ({ bottomClose }: { bottomClose: () => void }) => {
  const [isChecked, setIsChecked] = useState(Array(reportCases.length).fill(false));
  const { toggle, isOpen } = useToggle();

  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);
  };

  const handleReportClick = () => {
    const checkedReportCases = reportCases.filter((_, index) => isChecked[index]);
    console.log(checkedReportCases);

    // 신고하기 API 호출
    bottomClose();
    toggle();
  };

  return (
    <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', height: '70%' }}>
      <View style={{ marginTop: 18, width: '100%', alignItems: 'center' }}>
        <CustomText font="fontSemiBold" size="20px">
          신고 항목을 선택해 주세요
        </CustomText>
        <CustomText font="fontSemiBold" size="12px" color={colors.textQaGray} style={{ marginTop: 12 }}>
          중복으로 선택 가능합니다
        </CustomText>
      </View>
      {reportCases.map((reportCase, index) => (
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', width: '90%' }}>
          <Checkbox
            value={isChecked[index]}
            onValueChange={() => handleCheckboxChange(index)}
            color={isChecked[index] ? colors.primary : colors.buttonAuthToggle}
          />
          <CustomText font="fontRegular" size="14px" style={{ marginLeft: 10 }}>
            {reportCase}
          </CustomText>
        </View>
      ))}
      <InputStyled
        placeholder={
          '신고 사유를 입력해주세요\n신고 사유에 맞지 않는 신고일 경우,\n해당 신고는 처리되지 않습니다.\n누적 신고횟수 3회 이상인 유저는\n서비스 이용이 불가능하며,\n프로필은 자동으로 차단됩니다.'
        }
        placeholderTextColor={colors.textGray}
      />
      <NextButtonStyled
        onPress={() => handleReportClick()}
        disabled={reportCases.filter((_, index) => isChecked[index]).length === 0}
      >
        <CustomText size="16px" color={colors.secondary} font="fontMedium">
          신고하기
        </CustomText>
      </NextButtonStyled>
      <CustomModal
        modalConfig={{
          visible: isOpen,
          onClose: toggle,
          mode: 'round',
          contents: <ReportModalContent />,
          buttons: [{ label: '확인', action: toggle }],
        }}
      />
    </View>
  );
};

export default ReportOption;
