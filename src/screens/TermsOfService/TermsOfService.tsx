import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import nextArrow from '@assets/images/icons/NextArrow.png';
import { agreementTitles, agreementUrls } from '@commons/contents/agreement/agreementUrls';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useGetPushToken from '@commons/hooks/notifications/getPushToken/useGetPushToken';
import { usePostPushToken } from '@commons/hooks/notifications/postPushToken/usePostPushToken';
import { useAgreementStore } from '@commons/store/appStatus/agreement/useAgreement';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Image, Linking, Text, TouchableOpacity, View } from 'react-native';
import * as T from './TermsOfService.styles';

const TermsOfService = () => {
  useScreenLogger();
  const { movePage } = useMovePage();
  const { updateAgreement } = useAgreementStore();
  const { getPushToken } = useGetPushToken();
  const { postPushToken } = usePostPushToken();

  const handleAgreementLinkPress = (index: number) => {
    const url = agreementUrls[index - 2]; // index는 1부터 시작하므로 1을 빼줘야 해당 인덱스의 주소에 접근 가능
    Linking.openURL(url);
  };

  const onClickMovePage = async () => {
    const pushToken = await getPushToken();
    if (pushToken) {
      await postPushToken(pushToken);
    }
    movePage('schoolStudentID')();
  };

  const [isChecked, setIsChecked] = useState(Array(agreementTitles.length).fill(false)); // Initialize an array of checkbox states
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...isChecked];
    if (index === 0) {
      const newValue = !updatedChecked[0];
      for (let i = 0; i < updatedChecked.length; i++) {
        updatedChecked[i] = newValue;
      }
    } else {
      updatedChecked[index] = !updatedChecked[index];

      if (!updatedChecked[index]) {
        updatedChecked[0] = false;
      }
    }
    setIsChecked(updatedChecked);

    const anyCheckboxChecked = updatedChecked.slice(1, 6).every((checked) => checked);
    if (anyCheckboxChecked === true) updatedChecked[0] = true;
    setIsActive(anyCheckboxChecked);

    if (index === 0 || index === 6) {
      updateAgreement('adAgreementPolicy', updatedChecked[6]);
    }
  };

  return (
    <S.Wrapper style={{ paddingBottom: 5 }}>
      <View style={{ width: '100%' }}>
        <S.SafeAreaViewStyled>
          <S.TitleStyled>약관 동의</S.TitleStyled>
        </S.SafeAreaViewStyled>
        <T.ColumnStyled>
          <S.ContentStyled style={{ marginTop: 30, marginBottom: 30 }}>북블라 서비스 동의</S.ContentStyled>
          {agreementTitles.map((title, index) => (
            <React.Fragment key={title}>
              <T.RowStyled>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Checkbox
                    value={isChecked[index]}
                    onValueChange={() => handleCheckboxChange(index)}
                    color={isChecked[index] ? colors.primary : colors.buttonAuthToggle}
                    style={{ width: 22, height: 22 }}
                  />
                  <Text style={{ marginLeft: 8 }}>{title}</Text>
                </View>

                {(index === 2 || index === 3 || index === 4 || index === 5) && (
                  <TouchableOpacity onPress={() => handleAgreementLinkPress(index)}>
                    <Image source={nextArrow} style={{ width: 8, height: 16 }} />
                  </TouchableOpacity>
                )}
              </T.RowStyled>
              {index === 0 && <T.DividerStyled />}
              {index === 6 && (
                <Text style={{ color: colors.textGray3, fontSize: 12, marginLeft: 26 }}>
                  이벤트 및 혜택 정보를 보내드립니다.
                </Text>
              )}
            </React.Fragment>
          ))}
        </T.ColumnStyled>
      </View>
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
        {isActive !== true ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={() => onClickMovePage()}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </View>
    </S.Wrapper>
  );
};
export default TermsOfService;
