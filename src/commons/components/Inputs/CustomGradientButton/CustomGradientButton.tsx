import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { Text } from 'react-native';
import { ButtonStyled, ButtonTextStyled } from '../CustomButton/CustomButton.styles';
import { IProps } from '../CustomButton/CustomButton.types';

export const CustomGradientButton: React.FC<IProps> = ({ contents, onPress, ...rest }) => {
  return (
    <ButtonStyled {...rest} onPress={onPress} padding={'0'}>
      <LinearGradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        colors={['#5B247A', '#1BCEDF']}
        style={{
          // flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 60,
          paddingTop: 9,
          paddingBottom: 9,
          paddingLeft: 18,
          paddingRight: 18,
        }}
      >
        <ButtonTextStyled {...rest}>
          <Text>{contents}</Text>
        </ButtonTextStyled>
      </LinearGradient>
    </ButtonStyled>
  );
};
