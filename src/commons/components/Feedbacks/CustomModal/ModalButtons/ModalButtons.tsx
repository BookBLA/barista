import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { colors } from '@commons/styles/variablesStyles';
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
            <Image source={require('../../../../../../assets/images/buttons/prevButton.png')} />
          </S.ArrowButton>
          <S.ArrowButton onPress={buttons[1].action}>
            <Image source={require('../../../../../../assets/images/buttons/nextButton.png')} />
          </S.ArrowButton>
        </>
      )}
      {mode === 'round' &&
        buttons.map((button, index) => (
          <S.RoundButton key={index} onPress={button.action} width={buttonWidth} bgColor={button.bgColor}>
            <CustomText size="14px" font="fontMedium" color={button.color || colors.secondary}>
              {button.label}
            </CustomText>
          </S.RoundButton>
        ))}
    </S.BottomWrapper>
  );
};
