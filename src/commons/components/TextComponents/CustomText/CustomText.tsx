import React from 'react';
import * as S from './CustomText.styles';
import { IProps } from './CustomText.types';

export const CustomText = <T extends unknown[] = []>({
  children,
  size,
  color,
  font,
  weight,
  margin,
  style,
  onPress,
}: IProps<T>) => {
  return onPress ? (
    <S.Wrapper onPress={onPress} margin={margin}>
      <S.CustomText size={size} color={color} font={font} weight={weight} style={style}>
        {children}
      </S.CustomText>
    </S.Wrapper>
  ) : (
    <S.CustomText size={size} color={color} font={font} weight={weight} style={style} margin={margin}>
      {children}
    </S.CustomText>
  );
};
