import notYetNextButton from '@assets/images/buttons/NotYetNextButton.png';
import nextButton from '@assets/images/buttons/nextButton.png';
import prevButton from '@assets/images/buttons/prevButton.png';
import { postNicknameVerifyApi } from '@commons/api/members/profile/memberProfile.api';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { isAxiosErrorResponse } from '@commons/utils/api/errors/isAxiosErrorResponse/isAxiosErrorResponse';
import { isHangul } from '@commons/utils/data/isHangul/isHangul';
import { useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as S from '../../InitUserInfo.styles';

const NamePhone = () => {
  useHeaderControl({
    title: '정보 입력',
    left: false,
  });
  useScreenLogger();
  const { updateUserInfo, userInfo } = useUserStore();
  const { movePage } = useMovePage();
  const [name, setName] = useState(userInfo.name);
  const { showToast } = useToastStore((state) => state);

  const handleChangeName = (input: string) => {
    if (isHangul(input) || input === '') {
      setName(input);
    }
  };

  const verifyName = async () => {
    try {
      const response = await postNicknameVerifyApi(name);
      updateUserInfo({ name });
      movePage('genderBirth')();
    } catch (error) {
      if (!isAxiosErrorResponse(error)) return;
      console.error(error);
      showToast({ content: error.response.data.message });
    }
  };
  return (
    <S.Wrapper>
      {/* <TitleProgress gauge={50} /> */}
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <KeyboardAwareScrollView
          style={{ width: '100%' }}
          contentContainerStyle={{
            height: '100%',
            alignItems: 'center',
          }}
        >
          <View style={{ width: '100%', alignItems: 'center', marginTop: '34%' }}>
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
              value={name}
            />
          </View>
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
      <S.ButtonArea>
        <S.MoveButton onPress={movePage()}>
          <Image source={prevButton} />
        </S.MoveButton>
        {name.length < 2 ? (
          <Image source={notYetNextButton} />
        ) : (
          <S.MoveButton onPress={verifyName}>
            <Image source={nextButton} />
          </S.MoveButton>
        )}
      </S.ButtonArea>
    </S.Wrapper>
  );
};

export default NamePhone;
