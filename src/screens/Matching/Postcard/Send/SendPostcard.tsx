import { Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { IPostcardProps } from './SendPostcard.types';
import * as S from './SendPostcard.styles';
import postcardImage from '../../../../../assets/images/example-postcard.png';

export const SendPostcard: React.FC<IPostcardProps> = ({ index, ...rest }) => {
  const { postcardImageUrl, quizScore, schoolName, userId, age } = rest;
  return (
    <S.ContainerViewStyled>
      <TouchableOpacity onPress={() => console.log('엽서 누름', index)} style={{ height: '100%' }}>
        <Image source={postcardImage} style={S.styles.image} />
        <S.PostcardInfoViewStyled>
          <S.PostcardInfoFirstViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 14 }}>{`${age}살 `}</S.PostcardTextViewStyled>
            <S.PostcardTextViewStyled style={{ fontSize: 10 }}>
              {`(독서퀴즈: ${quizScore}점)`}{' '}
            </S.PostcardTextViewStyled>
          </S.PostcardInfoFirstViewStyled>
          <S.PostcardTextViewStyled style={{ fontSize: 12 }}>{schoolName}</S.PostcardTextViewStyled>
        </S.PostcardInfoViewStyled>
      </TouchableOpacity>
    </S.ContainerViewStyled>
  );
};
