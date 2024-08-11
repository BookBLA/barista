import { useEffect, useState } from 'react';
import { Image, Keyboard, Text, TouchableWithoutFeedback, View } from 'react-native';
import { colors } from '../../../../../commons/styles/variablesStyles';
import * as S from '../../../InitUserInfo.styles';
import { useUserStore } from '../../../../../commons/store/useUserinfo';
import { OpenChatTextFiledStyled, TextFiledStyled } from '../../../../InitStyle/InitStyle.styles';
import useMemberStore from '../../../../../commons/store/useMemberStore';
import useMovePage from '../../../../../commons/hooks/navigations/movePage/useMovePage';
import { useCounter } from '../../../../../commons/store/useCounter';
import { TitleProgress } from '../../TitleProgress';
import useManageMargin from '../../../../../commons/hooks/ui/manageMargin/useManageMargin';
import useHeaderControl from '../../../../../commons/hooks/ui/headerControl/useHeaderControl';

const OpenChat = () => {
  useManageMargin();
  useHeaderControl({
    title: '채팅방 등록',
    left: false,
  });
  const { movePage } = useMovePage();
  // const [link, setLink] = useState('');
  const { updateUserInfo, userInfo } = useUserStore();

  const { increment } = useCounter();
  const moveNext = async () => {
    if (userInfo.openKakaoRoomUrl !== '') {
      increment();
    }
  };

  return (
    <S.Wrapper>
      <TitleProgress gauge={50} />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <S.ColumnStyled style={{ height: '80%' }}>
          <View style={{ width: '100%', alignItems: 'center' }}>
            <S.ContentStyled>오픈채팅방 링크 등록</S.ContentStyled>
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
              defaultValue={userInfo.openKakaoRoomUrl}
              onChangeText={(text: string) => updateUserInfo({ openKakaoRoomUrl: text })}
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
