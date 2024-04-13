import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import * as T from '../InitStyle/InitStyle.styles';
import useMovePage from '../../commons/hooks/useMovePage';
import MoveTop from '../../../assets/images/buttons/MoveTop.png';
import { ModifyTitleBar } from '../../commons/components/ModifyTitleBar/ModifyTitleBar';
import { TouchableOpacity, View, Image, Text } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { CustomText } from '../../commons/components/TextComponents/CustomText/CustomText';
import { DashDividerLine } from '../../commons/components/DashDividerLine/DashDividerLine';
import Example02 from '../Example02/Example02';
import { useStyleStore } from '../../commons/store/useStyle';
import { deviceWidth } from '../../commons/utils/dimensions';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import ModifyMBTI from '../../commons/components/ModifyMBTI/ModifyMBTI';
import useManageMargin from '../../commons/hooks/useManageMargin';
import { getMemberStyleApi, putMemberStyleApi } from '../../commons/api/memberStyle.api';
import useMemberStore from '../../commons/store/useMemberStore';

const ModifyStyle = () => {
  const buttonList = [
    'MBTI',
    '흡연 여부',
    '음주 여부',
    '연락\n스타일',
    '데이트\n스타일',
    '데이트\n비용',
    '이성친구\n범위',
    '개인 질문',
  ];
  const [mbti, setMbti] = useState(['E', 'S', 'T', 'J']);
  const drinkOptions = ['X', '월 1~2회', '주 1회', '주 2회 이상', '매일'];
  const costOptions = ['더치페이', '번갈아가면서 사기', '여유 있는 사람이 좀 더', '데이트 통장'];
  const sexOptions = ['허용 X', '단둘이 밥 먹기', '단둘이 술 먹기', '단둘이 여행 가기', '상관 없음'];
  const [question, setQuestion] = useState('');

  const handleTextChange = (text: string) => {
    if (question.trim() === '') {
      setQuestion(styleInfo.memberAsk); // 텍스트가 비어있으면 styleInfo.memberAsk로 설정합니다.
    } else {
      setQuestion(question);
      updateStyleInfo('memberAsk', question);
    }
  };

  const { updateStyleInfo, styleInfo } = useStyleStore();
  const scrollViewRef = useRef(null); // Create a ref for KeyboardAwareScrollView
  const handleMoveTop = () => {
    if (scrollViewRef.current) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };
  const handleMovePosition = (sectionIndex: number) => {
    let yOffset = 0; // 초기 y 오프셋을 설정합니다.

    // 섹션 인덱스에 따라 y 오프셋을 설정합니다.
    switch (sectionIndex) {
      case 0: // MBTI 섹션
        yOffset = 200; // MBTI 섹션의 시작 위치
        break;
      case 1: // 흡연 여부 섹션
        yOffset = 600; // 흡연 여부 섹션의 시작 위치
        break;
      case 2: // 음주 여부 섹션
        yOffset = 770; // 음주 여부 섹션의 시작 위치
        break;
      case 3: // 연락 스타일 섹션
        yOffset = 1050; // 연락 스타일 섹션의 시작 위치
        break;
      case 4: // 데이트 스타일 섹션
        yOffset = 1210; // 데이트 스타일 섹션의 시작 위치
        break;
      case 5: // 데이트 비용 섹션
        yOffset = 1560; // 데이트 비용 섹션의 시작 위치
        break;
      case 6: // 이성 친구 섹션
        yOffset = 2030; // 이성 친구 섹션의 시작 위치
        break;

      default:
        break;
    }

    // 스크롤 뷰를 이동합니다.
    if (scrollViewRef.current) {
      if (sectionIndex === 7) scrollViewRef.current.scrollToEnd({ animated: true });
      scrollViewRef.current.scrollTo({ x: 0, y: yOffset, animated: true });
    }
  };

  useManageMargin();

  const memberId = useMemberStore((state) => state.memberInfo.id);

  const callGetStyleApi = async () => {
    try {
      const response = await getMemberStyleApi(memberId);
      console.log('getMemberStyleApi', response);
      await updateStyleInfo('mbti', response.result.mbti);
      await updateStyleInfo('smokeType', response.result.smokeType);
      await updateStyleInfo('drinkType', response.result.drinkType);
      await updateStyleInfo('contactType', response.result.contactType);
      await updateStyleInfo('dateStyleType', response.result.dateStyleType);
      await updateStyleInfo('dateCostType', response.result.dateCostType);
      await updateStyleInfo('justFriendType', response.result.justFriendType);
      await updateStyleInfo('memberAsk', response.result.memberAsk);
      console.log('styleInfo', styleInfo);
      const newMbti = response.result.mbti.split(''); // Split the mbti string into an array
      setMbti(newMbti); // Update the mbti array with the newMbti array
      console.log('newMbti', newMbti);
    } catch (error) {
      console.log('ERROR) getMemberStyleApi', error);
    }
  };

  useEffect(() => {
    callGetStyleApi();
  }, []);
  useEffect(() => {
    // callGetStyleApi();
    const mbtiString = mbti.join('');
    console.log('mbti', mbti);
    console.log('mbtiString', mbtiString);
    updateStyleInfo('mbti', mbtiString);
  }, [mbti]);

  const callPutStyleApi = async () => {
    try {
      console.log('styleInfo', styleInfo);
      const response = await putMemberStyleApi(
        {
          mbti: styleInfo.mbti,
          smokeType: styleInfo.smokeType,
          drinkType: styleInfo.drinkType,
          contactType: styleInfo.contactType,
          dateStyleType: styleInfo.dateStyleType,
          dateCostType: styleInfo.dateCostType,
          justFriendType: styleInfo.justFriendType,
          memberAsk: styleInfo.memberAsk,
        },
        memberId,
      );
      console.log('putMemberStyleApi Success', response);
    } catch (error) {
      console.log('ERROR) putMemberStyleApi', error);
    }
  };

  return (
    <S.Wrapper>
      <ModifyTitleBar step={1} callPutApi={callPutStyleApi} />
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
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            // height: '80%',
            alignItems: 'center',
          }}
        >
          <S.ColumnStyled style={{ backgroundColor: 'pink', padding: '0 16' }}>
            <S.ViewStyled height={200}>
              <S.RowStyled style={{ width: '95%' }}>
                <CustomText font="fontRegular" size="12" style={{ marginBottom: 14 }}>
                  바로 가기
                </CustomText>
              </S.RowStyled>
              <S.RowStyled style={{ width: '95%', marginBottom: 6 }}>
                {buttonList.slice(0, 4).map((button, index) => (
                  <T.MoveButtonStyled key={index} onPress={() => handleMovePosition(index)}>
                    <CustomText font="fontRegular" size="12" color={colors.textGray4} style={{ textAlign: 'center' }}>
                      {button}
                    </CustomText>
                  </T.MoveButtonStyled>
                ))}
              </S.RowStyled>
              <S.RowStyled style={{ width: '95%' }}>
                {buttonList.slice(4, 8).map((button, index) => (
                  <T.MoveButtonStyled key={index} onPress={() => handleMovePosition(index + 4)}>
                    <CustomText font="fontRegular" size="12" color={colors.textGray4} style={{ textAlign: 'center' }}>
                      {button}
                    </CustomText>
                  </T.MoveButtonStyled>
                ))}
              </S.RowStyled>
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={350}>
              <S.ContentStyled style={{ marginBottom: 8 }}>MBTI를 알려주세요.</S.ContentStyled>
              <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 40 }}>
                4가지 모두 골라주세요.
              </Text>
              <ModifyMBTI setMbti={setMbti} mbti={styleInfo.mbti} />
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={480}>
              <S.ContentStyled>흡연 여부를 알려주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '90%', marginBottom: 80 }}>
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
              <S.ContentStyled>음주 여부를 알려주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '90%', marginBottom: 10 }}>
                {drinkOptions.slice(0, 3).map((title, index) => (
                  <T.ButtonStyled
                    key={index}
                    isSelect={styleInfo.drinkType === title}
                    onPress={() => updateStyleInfo('drinkType', title)}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.drinkType === title}>{title}</S.ButtonTextStyled>
                  </T.ButtonStyled>
                ))}
              </S.RowStyled>
              <S.RowStyled style={{ width: deviceWidth * 0.58 }}>
                {drinkOptions.slice(3).map((title, index) => (
                  <T.ButtonStyled
                    key={index + 3}
                    isSelect={styleInfo.drinkType === title}
                    onPress={() => updateStyleInfo('drinkType', title)}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.drinkType === title}>{title}</S.ButtonTextStyled>
                  </T.ButtonStyled>
                ))}
              </S.RowStyled>
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={460}>
              <S.ContentStyled>연락 스타일을 알려주세요.</S.ContentStyled>
              <S.RowStyled style={{ marginBottom: 80, width: '60%' }}>
                <S.BooleanButtonStyled
                  isSelect={styleInfo.contactType === '느긋이'}
                  onPress={() => updateStyleInfo('contactType', '느긋이')}
                >
                  <S.ButtonTextStyled isSelect={styleInfo.contactType === '느긋이'}>느긋이</S.ButtonTextStyled>
                </S.BooleanButtonStyled>
                <S.BooleanButtonStyled
                  isSelect={styleInfo.contactType === '칼답'}
                  onPress={() => updateStyleInfo('contactType', '칼답')}
                >
                  <S.ButtonTextStyled isSelect={styleInfo.contactType === '칼답'}>칼답</S.ButtonTextStyled>
                </S.BooleanButtonStyled>
              </S.RowStyled>
              <S.ContentStyled>데이트 스타일을 알려주세요.</S.ContentStyled>
              <S.RowStyled style={{ width: '60%' }}>
                <S.BooleanButtonStyled
                  isSelect={styleInfo.dateStyleType === '집 데이트'}
                  onPress={() => updateStyleInfo('dateStyleType', '집 데이트')}
                >
                  <S.ButtonTextStyled isSelect={styleInfo.dateStyleType === '집 데이트'}>집 데이트</S.ButtonTextStyled>
                </S.BooleanButtonStyled>
                <S.BooleanButtonStyled
                  isSelect={styleInfo.dateStyleType === '야외 데이트'}
                  onPress={() => updateStyleInfo('dateStyleType', '야외 데이트')}
                >
                  <S.ButtonTextStyled isSelect={styleInfo.dateStyleType === '야외 데이트'}>
                    야외 데이트
                  </S.ButtonTextStyled>
                </S.BooleanButtonStyled>
              </S.RowStyled>
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={450}>
              <View style={{ width: '100%', alignItems: 'center' }}>
                <S.ContentStyled style={{ marginBottom: 38 }}>데이트비용 부담 방식을 알려주세요.</S.ContentStyled>
                {costOptions.map((title, index) => (
                  <T.LongButtonStyled
                    key={index}
                    isSelect={styleInfo.dateCostType === title}
                    onPress={() => updateStyleInfo('dateCostType', title)}
                  >
                    <S.ButtonTextStyled isSelect={styleInfo.dateCostType === title}>{title}</S.ButtonTextStyled>
                  </T.LongButtonStyled>
                ))}
              </View>
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={500}>
              <S.ContentStyled style={{ marginBottom: 38 }}>이성 친구 허용범위를 알려주세요.</S.ContentStyled>
              {sexOptions.map((title, index) => (
                <T.LongButtonStyled
                  key={index}
                  isSelect={styleInfo.justFriendType === title}
                  onPress={() => updateStyleInfo('justFriendType', title)}
                >
                  <S.ButtonTextStyled isSelect={styleInfo.justFriendType === title}>{title}</S.ButtonTextStyled>
                </T.LongButtonStyled>
              ))}
            </S.ViewStyled>
            <DashDividerLine />
            <S.ViewStyled height={300}>
              <S.ContentStyled style={{ marginBottom: 10 }}>상대방에게 궁금한 점을 적어주세요</S.ContentStyled>
              <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium', fontSize: 14, marginBottom: 10 }}>
                ex) 주로 어디서 책을 읽나요?
              </Text>
              <T.TextFiledStyled
                defaultValue={styleInfo.memberAsk}
                onChangeText={handleTextChange}
                //onFocus={handleFocus}
                // onBlur={() => updateStyleInfo('memberAsk', question)}
                style={{
                  color: colors.primary,
                }}
              />
              <S.RowStyled style={{ justifyContent: 'flex-end', width: '80%' }}>
                <Text
                  style={{
                    color: colors.textGray2,
                    fontFamily: 'fontRegular',
                    fontSize: 12,
                    marginTop: 5,
                  }}
                >
                  {question.length}/80자
                </Text>
              </S.RowStyled>
            </S.ViewStyled>
          </S.ColumnStyled>
        </KeyboardAwareScrollView>
      </ScrollView>
    </S.Wrapper>
  );
};

export default ModifyStyle;
