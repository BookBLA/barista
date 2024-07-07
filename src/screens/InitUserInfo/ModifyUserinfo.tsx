import React, { useEffect, useRef, useState } from 'react';
import { colors } from '../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo/InitUserInfo.styles';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ModifyTitleBar } from '../../commons/components/ModifyTitleBar/ModifyTitleBar';
import { OpenChatTextFiledStyled } from '../InitStyle/InitStyle.styles';
import useMovePage from '../../commons/hooks/useMovePage';
import Dash from 'react-native-dash';
import { useUserStore } from '../../commons/store/useUserinfo';
import { ScrollView } from 'react-native-gesture-handler';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import MoveTop from '../../../assets/images/buttons/MoveTop.png';
import { DashDividerLine } from '../../commons/components/DashDividerLine/DashDividerLine';
import useManageMargin from '../../commons/hooks/useManageMargin';
import { getMemberProfileApi, patchMemberProfileApi } from '../../commons/api/memberProfile.api';
import useToastStore from '../../commons/store/useToastStore';
import useScreenLogger from '../../commons/hooks/useAnalyticsScreenLogger';

const ModifyUserinfo = () => {
  useScreenLogger();
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [link, setLink] = useState('');
  const [name, setName] = useState(userInfo.name);
  const [phNum, setPhNum] = useState(userInfo.phoneNumber);
  const showToast = useToastStore((state) => state.showToast);

  const isHangul = (text: string) => {
    const hangulRegex = /^[\u3131-\u318E\uAC00-\uD7A3]+$/;
    return hangulRegex.test(text);
  };

  const handleChangeName = (input: string) => {
    if (isHangul(input) || input === '') {
      setName(input);
    }
  };

  // const handlePhoneNumberChange = (phNum: string) => {
  //   const onlyNums = phNum.replace(/[^0-9]/g, '');
  //   let formattedNumber = '';
  //   if (onlyNums.length <= 3) {
  //     formattedNumber = onlyNums;
  //   } else if (onlyNums.length <= 7) {
  //     formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`;
  //   } else {
  //     formattedNumber = `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 7)}-${onlyNums.slice(7, 11)}`;
  //   }
  //   setPhNum(formattedNumber);
  // };

  const scrollViewRef = useRef<ScrollView>(null); // Create a ref for KeyboardAwareScrollView

  const handleMoveTop = () => {
    if (scrollViewRef.current) {
      if (scrollViewRef.current) {
        scrollViewRef.current.scrollTo({ x: 0, y: 0, animated: true });
      }
    }
  };

  useManageMargin();

  const callGetMemberProfileApi = async () => {
    try {
      const response = await getMemberProfileApi();
      console.log('유저 정보 불러오기', response);
      updateUserInfo({
        name: response.result.name,
        phoneNumber: response.result.phoneNumber,
        gender: response.result.gender,
        schoolName: response.result.schoolName,
        schoolEmail: response.result.schoolEmail,
        openKakaoRoomUrl: response.result.openKakaoRoomUrl,
        studentIdImageUrl: response.result.studentIdImageUrl,
        profileImageUrl: response.result.profileImageUrl,
        birthDate: response.result.birthDate,
      });
      setName(response.result.name);
      setPhNum(response.result.phoneNumber);
      setLink(response.result.openKakaoRoomUrl);
    } catch (error) {
      console.log('유저 정보 Get error', error);
    }
  };

  const callPutMemberProfileApi = async () => {
    try {
      await patchMemberProfileApi({
        name,
        phoneNumber: phNum,
        schoolName: userInfo.schoolName,
        openKakaoRoomUrl: link,
      });
      showToast({
        content: '회원 정보가 수정되었습니다.',
      });
    } catch (error) {
      console.log('회원 정보 실패', error);
    }
  };

  const modifyInfo = async () => {
    if (name !== '' && phNum !== '' && link !== '') {
      console.log('modifyInfo', name, phNum, link);
      await callPutMemberProfileApi();
      await updateUserInfo({
        name,
        phoneNumber: phNum,
        openKakaoRoomUrl: link,
      });
    }
  };

  useEffect(() => {
    callGetMemberProfileApi();
  }, []);

  return (
    <S.Wrapper>
      <ModifyTitleBar step={0} callPutApi={modifyInfo} />
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
        {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} style={{ height: '100% ' }}> */}
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            // height: '80%',
            alignItems: 'center',
          }}
        >
          <S.ViewStyled height={150}>
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
              defaultValue={name}
              onChangeText={(text: string) => handleChangeName(text)}
              // onBlur={() => updateUserInfo('name', name)}
              placeholder="닉네임"
              placeholderTextColor={colors.textGray2}
              value={name}
            />

            {/* <S.ContentStyled style={{ marginTop: 50 }}>전화번호를 입력해 주세요.</S.ContentStyled>
            <S.TextFiledStyled
              defaultValue={userInfo.phoneNumber}
              value={phNum}
              onChangeText={handlePhoneNumberChange}
              keyboardType="numeric" // 숫자 키패드만 허용
              maxLength={13} // 최대 길이 제한 (하이픈 포함)
              placeholder="010-1234-5678"
              placeholderTextColor={colors.textGray2}
            /> */}
          </S.ViewStyled>
          <DashDividerLine />
          <S.ViewStyled height={330}>
            <S.ContentStyled>오픈채팅방 링크를 등록해 주세요</S.ContentStyled>
            <Text
              style={{
                color: colors.textGray3,
                fontFamily: 'fontLight',
                fontSize: 12,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              알파벳으로 된 URL 링크만 붙여 넣어주세요.{'\n'}
              링크만 입력해 주셔야 채팅을 보낼 수 있습니다.
            </Text>
            <OpenChatTextFiledStyled
              placeholder="부적절하거나 불쾌감을 줄 수 있는 컨텐츠는 제재를 받을 수 있습니다."
              defaultValue={link}
              value={link}
              onChangeText={setLink}
              style={{
                color: colors.primary,
              }}
            />
            <S.ButtonStyled
              onPress={movePage('infoOpenChat')}
              style={{ height: 44, width: 150, backgroundColor: colors.primary, marginTop: 26 }}
            >
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>링크 가져오는 법</Text>
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
          {/* <S.ViewStyled height={200}>
            <S.ContentStyled>학교를 선택해 주세요.</S.ContentStyled>
            <S.ButtonStyled disabled>
              <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>{userInfo.schoolName}</Text>
            </S.ButtonStyled>
          </S.ViewStyled> */}
        </KeyboardAwareScrollView>
        {/* </TouchableWithoutFeedback> */}
      </ScrollView>
    </S.Wrapper>
  );
};

export default ModifyUserinfo;
