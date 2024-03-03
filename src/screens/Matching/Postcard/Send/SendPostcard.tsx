import React from 'react';
import { ISendPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import { PostcardTextViewStyled } from './SendPostcard.styles';
import { View } from 'react-native';
import postcardImage from '../../../../../assets/images/example-postcard.png';

export const SendPostcard: React.FC<ISendPostcardProps> = ({ index, ...rest }) => {
  console.log(rest);
  const { userId, userName, userProfileImageUrl, gender, schoolName, age, postcardStatus } = rest;
  return (
    <>
      <S.ContainerViewStyled>
        <S.UserInfoViewStyled>
          <S.CircularImage source={postcardImage} resizeMode="contain" />
          <View style={{ flex: 5, padding: 8 }}>
            <PostcardTextViewStyled style={{ fontSize: 16 }}>성 이름|나이</PostcardTextViewStyled>
            <PostcardTextViewStyled style={{ fontSize: 12 }}>성 이름|나이</PostcardTextViewStyled>
            <PostcardTextViewStyled>성 이름|나이</PostcardTextViewStyled>
          </View>
        </S.UserInfoViewStyled>
      </S.ContainerViewStyled>
      <S.dashLineViewStyled />
    </>
  );
};
