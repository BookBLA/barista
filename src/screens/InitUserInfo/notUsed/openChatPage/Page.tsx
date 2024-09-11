import { colors } from '@commons/styles/variablesStyles';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import React from 'react';
import { Image, Text, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

interface IPage {
  item: { content: string; img: any; index: number };
  style: ViewStyle;
}

const PageItem = styled.View<{ color: string }>`
  /* background-color: teal; */
  justify-content: center;
  align-items: center;
  border-radius: 20px;

  /* height: 100%; */
`;

export default function Page({ item, style }: IPage) {
  // console.log('itme', item);
  return (
    <PageItem style={style}>
      <Image style={{ width: '100%', height: '80%', objectFit: 'fill' }} source={item.img} />
      {item.index === 5 ? (
        <S.OpenChatTitleStyled>
          <S.TextStyled style={{ color: colors.primary, fontSize: 20 }}>5. (필수) </S.TextStyled>
          <S.TextStyled style={{ color: colors.errorMessageRed, fontFamily: 'fontSemiBold', fontSize: 20 }}>
            기본프로필
          </S.TextStyled>
          <S.TextStyled style={{ color: colors.primary, fontSize: 20 }}>만 참가 허용하기</S.TextStyled>
        </S.OpenChatTitleStyled>
      ) : (
        <S.OpenChatTitleStyled key={item.index}>
          <Text style={{ color: colors.primary, fontSize: 20 }}>{item.content}</Text>
        </S.OpenChatTitleStyled>
      )}
    </PageItem>
  );
}
