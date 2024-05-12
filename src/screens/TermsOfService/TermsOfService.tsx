import useMovePage from '../../commons/hooks/useMovePage';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import * as T from './TermsOfService.styles';
import { Text, TouchableOpacity, Image, View, Linking } from 'react-native';
import { colors } from '../../commons/styles/variablesStyles';
import Checkbox from 'expo-checkbox';
import React, { useEffect, useState } from 'react';
import nextArrow from '../../../assets/images/icons/NextArrow.png';
import { useAgreementStore } from '../../commons/store/useAgreement';
import { agreementTitles, agreementUrls } from '../../commons/contents/agreement/agreementUrls';

const TermsOfService = () => {
  useEffect(() => {
    console.log('agreementInfo', agreementInfo);
  });
  const { movePage } = useMovePage();
  const { updateAgreement, agreementInfo } = useAgreementStore();

  const handleAgreementLinkPress = (index: number) => {
    const url = agreementUrls[index - 2]; // index는 1부터 시작하므로 1을 빼줘야 해당 인덱스의 주소에 접근 가능
    Linking.openURL(url);
  };

  const [isChecked, setIsChecked] = useState(Array(agreementTitles.length).fill(false)); // Initialize an array of checkbox states
  const [isActive, setIsActive] = useState<boolean>(false);
  const handleCheckboxChange = (index: number) => {
    const updatedChecked = [...isChecked];
    if (index === 0) {
      // If the first checkbox is clicked, toggle all other checkboxes accordingly
      const newValue = !updatedChecked[0];
      for (let i = 0; i < updatedChecked.length; i++) {
        updatedChecked[i] = newValue;
      }
    } else {
      updatedChecked[index] = !updatedChecked[index];

      // If any other checkbox is clicked, and it becomes false, set the first checkbox to false
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
            <React.Fragment key={index}>
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
                    <Image source={nextArrow} style={{ width: 8, height: 16, marginRight: '0.9%' }} />
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
      <S.NextButtonStyled
        onPress={isActive === true ? movePage('initUserinfoStack') : undefined}
        style={{ backgroundColor: isActive === true ? colors.primary : colors.buttonAuthToggle }}
      >
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default TermsOfService;
