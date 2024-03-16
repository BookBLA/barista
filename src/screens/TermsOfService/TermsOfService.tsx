import useMovePage from '../../commons/hooks/useMovePage';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import * as T from './TermsOfService.styles';
import { Text, TouchableOpacity, Image, View, Linking } from 'react-native';
import { colors } from '../../commons/styles/variablesStyles';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import nextArrow from '../../../assets/images/icons/NextArrow.png';

const TermsOfService = () => {
  const { movePage } = useMovePage();
  const agreementTitles = [
    '약관 전체 동의',
    '만 18세 이상입니다 (필수)',
    '서비스 이용약관 동의 (필수)',
    '개인정보 수집 및 이용 동의 (필수)',
    '개인정보 제3자 제공 동의 (필수)',
    '민감정보 수집 및 이용 동의 (필수)',
    '마케팅 정보 수신 동의 (선택)',
  ];
  const agreementUrls = [
    'https://rust-sprite-73f.notion.site/9f79f7b3c5a24e01b4d592a8be8ba5b7',
    'https://rust-sprite-73f.notion.site/8048e82a8d964df3ac5298ecb03f9114',
    'https://rust-sprite-73f.notion.site/3-c7de210a0d9f4500844ff813d73451ea',
    'https://rust-sprite-73f.notion.site/442c4ef7242f42dc935849e159e8f65d',
  ];

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

    // 체크박스가 1, 2, 3, 4, 5 중 하나라도 체크되었을 때 isActive를 true로 설정
    const anyCheckboxChecked = updatedChecked.slice(1, 6).every((checked) => checked);
    if (anyCheckboxChecked === true) updatedChecked[0] = true;
    setIsActive(anyCheckboxChecked);
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>약관 동의</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <T.ColumnStyled>
        <S.ContentStyled style={{ marginBottom: 30 }}>북블라 서비스 동의</S.ContentStyled>
        {agreementTitles.map((title, index) => (
          <React.Fragment key={index}>
            <T.RowStyled>
              <View style={{ flexDirection: 'row' }}>
                <Checkbox
                  value={isChecked[index]}
                  onValueChange={() => handleCheckboxChange(index)}
                  color={isChecked[index] ? colors.primary : colors.buttonAuthToggle}
                />
                <Text style={{ marginLeft: 6 }}>{title}</Text>
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
      {isActive === false ? (
        <S.NextButtonStyled style={{ backgroundColor: '#BBBFCF' }}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      ) : (
        <S.NextButtonStyled onPress={movePage('initUserinfoStack')}>
          <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
        </S.NextButtonStyled>
      )}
    </S.Wrapper>
  );
};
export default TermsOfService;
