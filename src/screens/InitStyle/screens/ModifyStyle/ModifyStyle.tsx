import MoveTop from '@assets/images/buttons/MoveTop.png';
import { GetMyInfoApi, PutMyInfoApi } from '@commons/api/members/default/member.api';
import { ModifyTitleBar } from '@commons/components/Navigations/ModifyTitleBar/ModifyTitleBar';
import ModifyMBTI from '@commons/components/Specific/ModifyMBTI/ModifyMBTI';
import { DashDividerLine } from '@commons/components/Utils/DashDividerLine/DashDividerLine';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useManageMargin from '@commons/hooks/ui/manageMargin/useManageMargin';
import { useLimitTextLine } from '@commons/hooks/utils/limitTextLine/useLimitTextLine';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import * as T from '@screens/InitStyle/InitStyle.styles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import React, { useEffect, useRef, useState } from 'react';
import { Image, Keyboard, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

const buttonList = ['닉네임', 'MBTI', '흡연 여부', '키'];

const ModifyStyle = () => {
  useScreenLogger();
  const { handleLimitTextLine } = useLimitTextLine();
  const [mbti, setMbti] = useState(['', '', '', '']);
  const { updateUserInfo, userInfo } = useUserStore();
  const { updateStyleInfo, styleInfo } = useStyleStore();
  const showToast = useToastStore((state) => state.showToast);

  const scrollViewRef = useRef(null); // Create a ref for KeyboardAwareScrollView
  const handleMoveTop = () => {
    if (scrollViewRef.current) {
      (scrollViewRef.current as ScrollView).scrollTo({ x: 0, y: 0, animated: true });
    }
  };
  const handleMovePosition = (sectionIndex: number) => {
    let yOffset = 0;

    // 섹션 인덱스에 따라 y 오프셋을 설정합니다.
    switch (sectionIndex) {
      case 0:
        yOffset = 130;
        break;
      case 1:
        yOffset = 130 + 250;
        break;
      case 2:
        yOffset = 130 + 250 + 320;
        break;
      case 3:
        yOffset = 130 + 250 + 320 + 300;
        break;
      default:
        yOffset = 0;
        break;
    }

    if (scrollViewRef.current) {
      if (sectionIndex === 7) (scrollViewRef.current as ScrollView).scrollToEnd({ animated: true });
      (scrollViewRef.current as ScrollView).scrollTo({ x: 0, y: yOffset, animated: true });
    }
  };

  useManageMargin();

  const callGetStyleApi = async () => {
    try {
      const response = await GetMyInfoApi();
      updateUserInfo({ name: response.result.name });
      updateStyleInfo('mbti', response.result.mbti);
      updateStyleInfo('smokeType', response.result.smokeType);
      updateStyleInfo('height', response.result.height);
      const newMbti = response.result.mbti.split(''); // Split the mbti string into an array
      setMbti([...newMbti]); // Update the mbti array with the newMbti array
    } catch (error) {
      console.log('ERROR) getMemberStyleApi', error);
    }
  };

  useEffect(() => {
    callGetStyleApi();
  }, []);

  const callPutMyInfoApi = async () => {
    try {
      const response = await PutMyInfoApi({
        name: userInfo.name,
        mbti: styleInfo.mbti,
        smokeType: styleInfo.smokeType,
        height: styleInfo.height,
      });
      console.log('putMyInfoApi', response);
      showToast({
        content: '수정되었습니다.',
      });
    } catch (error) {
      console.log('ERROR) putMyInfoApi', error);
      showToast({
        content: error.response.data.message,
      });
    }
  };

  const handleChange = (input: string) => {
    const sanitizedInput = input.replace(/[^0-9]/g, '');
    const parsedInput = sanitizedInput === '' ? '' : parseInt(sanitizedInput);
    updateStyleInfo('height', parsedInput);
  };
  const isHangul = (text: string) => {
    const hangulRegex = /^[\u3131-\u318E\uAC00-\uD7A3\u00B7\u11A2]+$/;
    return hangulRegex.test(text);
  };

  const handleChangeName = (input: string) => {
    if (isHangul(input) || input === '') {
      updateUserInfo({ name: input });
    }
  };

  return (
    <S.Wrapper>
      <ModifyTitleBar step={0} callPutApi={callPutMyInfoApi} />
      <View style={{ position: 'absolute', bottom: 30, right: 10, zIndex: 2 }}>
        <TouchableOpacity onPress={handleMoveTop}>
          <Image source={MoveTop} style={{ width: 45, height: 45 }} />
        </TouchableOpacity>
      </View>
      <ScrollView
        alwaysBounceHorizontal={false}
        style={{ width: '100%', height: '100%' }}
        overScrollMode="never"
        ref={scrollViewRef}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <KeyboardAwareScrollView
            style={{ width: '100%' }}
            contentContainerStyle={{
              // height: '80%',
              alignItems: 'center',
            }}
          >
            <S.ColumnStyled style={{ height: '100%' }}>
              <S.ViewStyled height={130}>
                <S.RowStyled style={{ width: '90%' }}>
                  <CustomText font="fontRegular" size="12" style={{ marginBottom: 14 }}>
                    바로 가기
                  </CustomText>
                </S.RowStyled>
                <S.RowStyled style={{ width: '90%', marginBottom: 6 }}>
                  {buttonList.map((button, index) => (
                    <T.MoveButtonStyled key={index} onPress={() => handleMovePosition(index)}>
                      <CustomText font="fontRegular" size="12" color={colors.textGray4} style={{ textAlign: 'center' }}>
                        {button}
                      </CustomText>
                    </T.MoveButtonStyled>
                  ))}
                </S.RowStyled>
              </S.ViewStyled>
              <DashDividerLine />
              <S.ViewStyled height={250}>
                <S.ContentStyled style={{ marginBottom: 10 }}>닉네임을 입력해 주세요.</S.ContentStyled>
                <Text
                  style={{
                    color: colors.textGray3,
                    fontFamily: 'fontLight',
                    fontSize: 12,
                    textAlign: 'center',
                    marginBottom: 20,
                  }}
                >
                  한국어로 된 닉네임만 가능합니다.
                </Text>
                <S.TextFiledStyled
                  maxLength={10} // 최대 길이 제한
                  defaultValue={userInfo.name}
                  onChangeText={(text: string) => handleChangeName(text)}
                  placeholder="닉네임"
                  placeholderTextColor={colors.textGray2}
                  value={userInfo.name}
                />
              </S.ViewStyled>
              <S.ViewStyled height={320}>
                <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
                <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 40 }}>
                  4가지 모두 골라주세요.
                </Text>
                <ModifyMBTI setMbti={setMbti} mbti={mbti} />
              </S.ViewStyled>
              <S.ViewStyled height={300}>
                <S.ContentStyled>흡연 여부를 알려주세요.</S.ContentStyled>
                <S.RowStyled style={{ width: '90%' }}>
                  <T.ButtonStyled
                    isSelect={styleInfo.smokeType === '흡연'}
                    onPress={() => updateStyleInfo('smokeType', '흡연')}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.smokeType === '흡연'}>흡연</S.ButtonTextStyled>
                  </T.ButtonStyled>
                  <T.ButtonStyled
                    isSelect={styleInfo.smokeType === '비흡연'}
                    onPress={() => updateStyleInfo('smokeType', '비흡연')}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.smokeType === '비흡연'}>비흡연</S.ButtonTextStyled>
                  </T.ButtonStyled>
                  <T.ButtonStyled
                    isSelect={styleInfo.smokeType === '가끔'}
                    onPress={() => updateStyleInfo('smokeType', '가끔')}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.smokeType === '가끔'}>가끔</S.ButtonTextStyled>
                  </T.ButtonStyled>
                </S.RowStyled>
              </S.ViewStyled>
              <S.ViewStyled height={200} style={{ marginBottom: 60 }}>
                <S.ContentStyled style={{ marginBottom: 38 }}>키를 알려주세요</S.ContentStyled>
                <S.TextFiledStyled
                  maxLength={3} // 최대 길이 제한
                  defaultValue={styleInfo.height !== 0 ? styleInfo.height.toString() : ''}
                  onChangeText={(text: string) => handleChange(text)}
                  placeholder="nnn cm"
                  placeholderTextColor={colors.textGray2}
                  value={styleInfo.height !== 0 ? styleInfo.height.toString() : ''}
                  keyboardType="numeric"
                />
              </S.ViewStyled>
            </S.ColumnStyled>
          </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </S.Wrapper>
  );
};

export default ModifyStyle;
