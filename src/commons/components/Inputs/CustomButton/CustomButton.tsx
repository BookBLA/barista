import React from 'react';
import { Text } from 'react-native';
import { ButtonStyled, ButtonTextStyled } from './CustomButton.styles';
import { IProps } from './CustomButton.types';

export const CustomButton: React.FC<IProps> = ({ contents, onPress, ...rest }) => {
  return (
    <ButtonStyled {...rest} onPress={onPress}>
      <ButtonTextStyled {...rest}>
        <Text>{contents}</Text>
      </ButtonTextStyled>
    </ButtonStyled>
  );
};
