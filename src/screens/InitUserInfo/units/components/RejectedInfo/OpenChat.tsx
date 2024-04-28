import { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../../../commons/styles/variablesStyles';
import * as S from '../../../InitUserInfo.styles';
import { TitleProgress2 } from '../../TitleProgress2';
import { useUserStore } from '../../../../../commons/store/useUserinfo';
import { TextFiledStyled } from '../../../../InitStyle/InitStyle.styles';
import useMemberStore from '../../../../../commons/store/useMemberStore';
import useManageMargin from '../../../../../commons/hooks/useManageMargin';
import useMovePage from '../../../../../commons/hooks/useMovePage';

const OpenChat = () => {
  useManageMargin();
  const { movePage } = useMovePage();
  // const [link, setLink] = useState('');
  const { updateUserInfo, userInfo } = useUserStore();

  const moveNext = async () => {};

  return (
    <S.Wrapper>
      <TitleProgress2 gauge={50} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.ColumnStyled style={{ height: '80%' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>오픈채팅방 링크 등록</S.ContentStyled>
            <TextFiledStyled
              value={userInfo.openKakaoRoomUrl}
              onChangeText={(text: string) => updateUserInfo({ openKakaoRoomUrl: text })}
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
              <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>링크 가져오는 법</Text>
            </S.ButtonStyled>
          </View>
        </S.ColumnStyled>
      </TouchableWithoutFeedback>

      <S.NextButtonStyled
        onPress={userInfo.openKakaoRoomUrl === '' ? undefined : moveNext}
        style={{ backgroundColor: userInfo.openKakaoRoomUrl === '' ? colors.buttonAuthToggle : colors.primary }}
      >
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>수정 완료</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default OpenChat;
