import React, { useState } from 'react';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import { TouchableOpacity, View, Image, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { ModifyTitleBar } from '../../commons/components/ModifyTitleBar/ModifyTitleBar';
import { TextFiledStyled } from '../InitStyle/InitStyle.styles';
import useMovePage from '../../commons/hooks/useMovePage';
import Dash from 'react-native-dash';
import { useUserStore } from '../../commons/store/useUserinfo';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const ModifyUserinfo = () => {
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [link, setLink] = useState('');
  const [name, setName] = useState('');
  const [phNum, setPhNum] = useState(userInfo.phoneNumber);

  const handlePhoneNumberChange = (phNum: string) => {
    const onlyNums = phNum.replace(/[^0-9]/g, '');
    let formattedNumber = '';
    if (onlyNums.length <= 3) {
      formattedNumber = onlyNums;
    } else if (onlyNums.length <= 7) {
      formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
    } else {
      formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
    }
    setPhNum(formattedNumber);
  };

  return (
    <S.Wrapper>
      <ModifyTitleBar step={0} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '80%',
            justifyContent: 'space-around',
          }}
        >
          <S.ColumnStyled>
            <S.ViewStyled>
              <S.ContentStyled>오픈채팅방 링크 등록</S.ContentStyled>
              <TextFiledStyled
                value={link}
                onChangeText={setLink}
                // onFocus={handleFocus}
                // onBlur={handleBlur}
                style={{
                  color: colors.primary,
                }}
              />
              <S.ButtonStyled
                onPress={movePage('infoOpenChat')}
                style={{ height: 44, width: 150, backgroundColor: colors.primary, marginTop: 26 }}
              >
                <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>
                  링크 가져오는 법
                </Text>
              </S.ButtonStyled>
            </S.ViewStyled>
            <Dash
              style={{
                width: '85%',
                height: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}
              dashGap={5}
              dashLength={5}
              dashThickness={1.5}
              dashColor={colors.lineDivider}
            />
            <S.ViewStyled>
              <S.ContentStyled>이름을 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                defaultValue={userInfo.name}
                onChangeText={(text: string) => setName(text)}
                // onBlur={() => updateUserInfo('name', name)}
                placeholder="이름"
                placeholderTextColor={colors.textGray2}
              />
            </S.ViewStyled>
            <S.ViewStyled>
              <S.ContentStyled>전화번호를 입력해 주세요.</S.ContentStyled>
              <S.TextFiledStyled
                value={phNum}
                onChangeText={handlePhoneNumberChange}
                // onBlur={() => updateUserInfo('phoneNumber', phNum)}
                keyboardType="numeric" // 숫자 키패드만 허용
                maxLength={13} // 최대 길이 제한 (하이픈 포함)
                placeholder="010-1234-5678"
                placeholderTextColor={colors.textGray2}
              />
            </S.ViewStyled>
            <Dash
              style={{
                width: '85%',
                height: 1,
                flexDirection: 'row',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop: 10,
              }}
              dashGap={5}
              dashLength={5}
              dashThickness={1.5}
              dashColor={colors.lineDivider}
            />
            <S.ViewStyled>
              <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
              <S.ButtonStyled>
                <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>가천대학교</Text>
              </S.ButtonStyled>
            </S.ViewStyled>
          </S.ColumnStyled>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </S.Wrapper>
  );
};

export default ModifyUserinfo;
