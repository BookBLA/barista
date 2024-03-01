import React from 'react';
import { Image } from 'react-native';
import * as S from './ModalButtons.styles';
import { IProps } from './ModalButtons.types';

export const ModalButtons: React.FC<IProps> = ({ buttons, mode }) => {
  if (!buttons || !mode) return null;

  const buttonWidth = buttons.length === 1 ? '100%' : '49%';

  return (
    <S.BottomWrapper>
      {mode === 'arrow' && (
        <>
          <S.ArrowButton onPress={buttons[0].action}>
            <Image source={require('../../../../../assets/images/icons/leftArrow.png')} />
          </S.ArrowButton>
          <S.ArrowButton onPress={buttons[1].action}>
            <Image source={require('../../../../../assets/images/icons/rightArrow.png')} />
          </S.ArrowButton>
        </>
      )}
      {mode === 'round' &&
        buttons.map((button, index) => (
          <S.RoundButton key={index} onPress={button.action} width={buttonWidth} bgColor={button.bgColor}>
            <S.ButtonText color={button.color}>{button.label}</S.ButtonText>
          </S.RoundButton>
        ))}
    </S.BottomWrapper>
  );
};
