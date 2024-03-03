import React from 'react';
import { EGender, ISendPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import { PostcardTextViewStyled } from './SendPostcard.styles';
import postcardImage from '../../../../../assets/images/example-postcard.png';
import manIcon from '../../../../../assets/images/icons/ManSmall.png';
import womanIcon from '../../../../../assets/images/icons/WomanSmall.png';

export const SendPostcard: React.FC<ISendPostcardProps> = ({ index, ...rest }) => {
  console.log(rest);
  const { userId, userName, userProfileImageUrl, gender, schoolName, age, postcardStatus } = rest;
  return (
    <>
      <S.ContainerViewStyled>
        <S.UserInfoViewStyled>
          <S.CircularImage source={postcardImage} resizeMode="contain" />
          <S.UserInfoWrapper>
            <S.UserInfoNameWrapper>
              <PostcardTextViewStyled style={{ fontSize: 16 }}>성 이름|나이</PostcardTextViewStyled>
              <S.GenderIconStyled source={gender === EGender.MAN ? manIcon : womanIcon} />
            </S.UserInfoNameWrapper>
            <PostcardTextViewStyled style={{ fontSize: 12 }}>성 이름|나이</PostcardTextViewStyled>
            <PostcardTextViewStyled>성 이름|나이</PostcardTextViewStyled>
          </S.UserInfoWrapper>
        </S.UserInfoViewStyled>
      </S.ContainerViewStyled>
      <S.dashLineViewStyled />
    </>
  );
};
