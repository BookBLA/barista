import React from 'react';
import { Image } from 'react-native';
import { IProps } from './OnboardingModal.types';
import * as S from './OnboardingModal.styles';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';

export const ModalItem: React.FC<IProps> = ({ index, item, activeSlide, onPrevSlide, onNextSlide, onClose }) => {
  return (
    <S.Wrapper>
      <S.ImageSection>
        <Image style={{ width: '70%', height: '75%' }} resizeMode="contain" source={item.image} />
      </S.ImageSection>

      <S.TextSection>
        <S.Title>{item.title}</S.Title>
        <S.Description>{item.description}</S.Description>
      </S.TextSection>

      <S.Footer>
        <S.LeftButton onPress={onPrevSlide}>
          <CustomText color="#00000066">{item.leftButtonText}</CustomText>
        </S.LeftButton>
        <S.PageIndex resizeMode="contain" source={item.indexImage} />
        <S.RightButton
          onPress={index === 2 ? onClose : onNextSlide}
          style={{ backgroundColor: index === 2 ? colors.primary02 : 'transparent' }}
        >
          <CustomText color="black">{item.rightButtonText}</CustomText>
        </S.RightButton>
      </S.Footer>
    </S.Wrapper>
  );
};
