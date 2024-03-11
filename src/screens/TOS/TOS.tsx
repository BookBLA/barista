import useMovePage from '../../commons/hooks/useMovePage';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import * as T from './TOS.styles';
import { Text } from 'react-native';
import { colors } from '../../commons/styles/variablesStyles';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';

const TOS = () => {
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
  const [isChecked, setIsChecked] = useState(Array(agreementTitles.length).fill(false)); // Initialize an array of checkbox states

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
  };

  return (
    <S.Wrapper>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>약관 동의</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <T.ColumnStyled>
        <S.ContentStyled>북블라 서비스 동의</S.ContentStyled>
        {agreementTitles.map((title, index) => (
          <T.RowStyled>
            <Checkbox
              value={isChecked[index]}
              onValueChange={() => handleCheckboxChange(index)}
              color={isChecked[index] ? colors.primary : undefined}
            />
            <Text>{title}</Text>
          </T.RowStyled>
        ))}
      </T.ColumnStyled>
      <S.NextButtonStyled onPress={movePage('initStyleStack')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};
export default TOS;
