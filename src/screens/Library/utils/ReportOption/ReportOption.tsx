import { postMemberReports } from '@commons/api/members/report/memberReports';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { reportCases } from '@commons/contents/report/reportCases';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { NextButtonStyled } from '@screens/InitUserInfo/InitUserInfo.styles';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ReportModalContent from '../ReportModalContent';
import { InputStyled } from './ReportOption.styles';

const reportStatusKeys = {
  bookQuizReport: 0,
  reviewReport: 1,
  askReport: 2,
  replyReport: 3,
  profileImageReport: 4,
};

type TReportStatusKeys = keyof typeof reportStatusKeys;

const ReportOption = ({
  bottomClose,
  reportedMemberId,
  onClose,
  onReport,
}: {
  bottomClose: () => void;
  reportedMemberId: number;
  onClose: () => void;
  onReport: () => void;
}) => {
  const [isChecked, setIsChecked] = useState(Array(reportCases.length).fill(false));
  const { toggle, isOpen } = useToggle();
  const [etcContents, setEtcContents] = useState('');
  const showToast = useToastStore((state) => state.showToast);

  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...isChecked];
    updatedChecked[index] = !updatedChecked[index];
    setIsChecked(updatedChecked);
  };

  useEffect(() => {}, [isChecked]);

  const handleReportClick = async () => {
    const reportStatuses = Object.keys(reportStatusKeys).reduce(
      (acc, key) => {
        const typedKey = key as TReportStatusKeys;
        acc[typedKey] = isChecked[reportStatusKeys[typedKey]];
        return acc;
      },
      {} as Record<TReportStatusKeys, boolean>,
    );

    try {
      await postMemberReports({
        reportedMemberId,
        reportStatuses,
        etcContents,
      });
      toggle();
    } catch (err) {
      showToast({
        content: '신고 하기에 실패하였습니다.',
      });
    }
  };

  // 화면 나갈때 onClose 호출
  useEffect(() => {
    return () => {
      console.log('ReportOption unmount');

      onClose();
    };
  }, []);

  return (
    <View style={{ width: '100%', alignItems: 'center', height: '100%' }}>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> */}
      <KeyboardAwareScrollView
        style={{ width: '100%', marginBottom: 20 }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
        keyboardShouldPersistTaps="handled"
        extraScrollHeight={100}
      >
        <View style={{ marginTop: 18, width: '100%', alignItems: 'center' }}>
          <CustomText font="fontSemiBold" size="20px">
            신고 항목을 선택해 주세요
          </CustomText>
          <CustomText
            font="fontSemiBold"
            size="12px"
            color={colors.textQaGray}
            style={{ marginTop: 12, marginBottom: 30 }}
          >
            중복으로 선택 가능합니다
          </CustomText>
        </View>
        <View style={{ width: '90%' }}>
          {reportCases.map((reportCase, index) => (
            <View style={{ flexDirection: 'row', alignItems: 'flex-start', marginBottom: 14 }} key={reportCase}>
              <Checkbox
                value={isChecked[index]}
                onValueChange={() => handleCheckboxChange(index)}
                color={isChecked[index] ? colors.primary : colors.buttonAuthToggle}
                style={{ borderWidth: 1 }}
              />
              <CustomText font="fontRegular" size="14px" style={{ marginLeft: 10 }}>
                {reportCase}
              </CustomText>
            </View>
          ))}
        </View>
        <InputStyled
          placeholder="신고 사유를 입력해주세요. 신고 사유에 맞지 않는 신고일 경우, 해당 신고는 처리되지 않습니다. 누적 신고횟수 3회 이상인 유저는 서비스 이용이 불가능하며, 프로필은 자동으로 차단됩니다."
          placeholderTextColor={colors.textGray}
          onChangeText={(text: string) => setEtcContents(text)}
        />
        <NextButtonStyled
          height={44}
          onPress={() => handleReportClick()}
          disabled={reportCases.filter((_, index) => isChecked[index]).length === 0}
          style={{
            backgroundColor:
              reportCases.filter((_, index) => isChecked[index]).length === 0
                ? colors.buttonAuthToggle
                : colors.primary,
          }}
        >
          <CustomText size="14px" color={colors.secondary} font="fontMedium">
            신고하기
          </CustomText>
        </NextButtonStyled>
        <CustomModal
          modalConfig={{
            visible: isOpen,
            onClose: toggle,
            mode: 'round',
            contents: <ReportModalContent />,
            buttons: [
              {
                label: '확인',
                action: () => {
                  bottomClose();
                  onReport();
                },
              },
            ],
          }}
        />
      </KeyboardAwareScrollView>
      {/* </TouchableWithoutFeedback> */}
    </View>
  );
};

export default ReportOption;
