import { useEffect, useState } from 'react';
import { Image, Text, View } from 'react-native';
import { colors } from '../../../commons/styles/variablesStyles';
import * as S from '../InitUserInfo.styles';
import { TitleProgress2 } from './TitleProgress2';
import useMovePage from '../../../commons/hooks/useMovePage';
import { useUserStore } from '../../../commons/store/useUserinfo';
import circle from '../../../../assets/images/icons/Circle.png';
import { TextFiledStyled } from '../../InitStyle/InitStyle.styles';

const OpenChatLink = () => {
  const { movePage } = useMovePage();
  const [link, setLink] = useState('');
  // const [isFocused, setIsFocused] = useState(false);
  // const handleFocus = () => {
  //   if (!isFocused) {
  //     setLink(''); // Clear the text when the TextInput is focused for the first time
  //     setIsFocused(true);
  //   }
  // };

  // const handleBlur = () => {
  //   if (link === '') {
  //     setLink('');
  //     setIsFocused(false);
  //   }
  // };
  return (
    <S.Wrapper>
      <TitleProgress2 gauge={25} />
      <S.ColumnStyled style={{ height: '80%' }}>
        <View style={{ width: '100%', alignItems: 'center' }}>
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
            <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 14 }}>링크 가져오는 법</Text>
          </S.ButtonStyled>
        </View>
      </S.ColumnStyled>
      <S.NextButtonStyled onPress={movePage('waitConfirm')}>
        <Text style={{ color: colors.secondary, fontFamily: 'fontMedium', fontSize: 16 }}>다음</Text>
      </S.NextButtonStyled>
    </S.Wrapper>
  );
};

export default OpenChatLink;
