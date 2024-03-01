import React from 'react';
import { Image } from 'react-native';
import * as S from '../CustomModal.styles';
import { IProps } from './ModalButtons.types';

export const ModalButtons: React.FC<IProps> = ({ buttons, mode }) => {
  const buttonWidth = buttons.length === 1 ? '100%' : '49%';

  if (!buttons || !mode) return null;

  if (mode === 'arrow') {
    return (
      <>
        <S.ArrowButton onPress={buttons[0].action}>
          <Image source={require('../../../../../assets/images/icons/leftArrow.png')} />
        </S.ArrowButton>
        <S.ArrowButton onPress={buttons[1].action}>
          <Image source={require('../../../../../assets/images/icons/rightArrow.png')} />
        </S.ArrowButton>
      </>
    );
  } else if (mode === 'round') {
    return buttons.map((button, index) => (
      <S.RoundButton key={index} onPress={button.action} bgColor={button.bgColor} width={buttonWidth}>
        <S.ButtonText color={button.color}>{button.label}</S.ButtonText>
      </S.RoundButton>
    ));
  }

  return null;
};
