import React from 'react';
import { ButtonStyled, ButtonTextStyled } from '../CustomButton/CustomButton.styles';
import { Text } from 'react-native';
import { IProps } from '../CustomButton/CustomButton.types';
import { LinearGradient } from 'expo-linear-gradient';

export const CustomGradientButton: React.FC<IProps> = ({ contents, onPress, ...rest }) => {
  return (
    <ButtonStyled {...rest} onPress={onPress} backgroundColor={'transparent'}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#5B247A', '#1BCEDF']}
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 60,
          // paddingTop: 6,
          // paddingBottom: 6,
          // paddingLeft: 12,
          // paddingRight: 12,
        }}
      >
        <ButtonTextStyled {...rest}>
          <Text>{contents}</Text>
        </ButtonTextStyled>
      </LinearGradient>
    </ButtonStyled>
  );
};
