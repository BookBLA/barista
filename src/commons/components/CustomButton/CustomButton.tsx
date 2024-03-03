import React from 'react';
import { ButtonStyled, ButtonTextStyled } from './CustomButton.styles';
import { Text, TouchableOpacity } from 'react-native';
import { IProps } from './CustomButton.types';

export const CustomButton: React.FC<IProps> = ({ contents, onPress, ...rest }) => {
  console.log(rest);
  return (
    <ButtonStyled props={rest}>
      <TouchableOpacity onPress={onPress}>
        <ButtonTextStyled props={rest}>
          <Text>{contents}</Text>
        </ButtonTextStyled>
      </TouchableOpacity>
    </ButtonStyled>
  );
};
