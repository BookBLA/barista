import React from 'react';
import { Image } from 'react-native';
import { IProps } from '@screens/Home/screens/Home/units/OnboardingModal/OnboardingModal.types';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './OnboardingModal.styles';

const images = [img.homeOnboarding1, img.homeOnboarding2, img.homeOnboarding3];
const titles = [
  '하루 최대 4명,\n오늘의 만남을 놓치지 마세요',
  '독서 퀴즈,\n신중하게 도전하세요!',
  '매일 무료 책갈피,\n친구 초대로 추가 보상까지!',
];
const descriptions = [
  '무료 2명에 광고 시청으로 2명을 더 소개받을 수 있어요.\n단, 오늘 매칭하지 않으면 자정에 초기화됩니다!',
  '퀴즈에 성공해야 상대방에게 엽서가 전송됩니다.\n틀리면 상대방이 사라지니 신중히 풀어보세요.',
  '광고를 보고 매일 무료 재화를 받아보세요.\n친구를 초대하면 더 많은 보상이 기다리고 있어요.',
];
const leftButtonText = ['', '이전', '이전'];
const rightButtonText = ['다음', '다음', '시작하기'];

export const ModalItem: React.FC<IProps> = ({ index }) => {
  return (
    <S.Wrapper>
      <S.ImageSection>
        <Image source={images[index]} />
      </S.ImageSection>

      <S.TextSection>
        <S.Title>{titles[index]}</S.Title>
        <S.Description>{descriptions[index]}</S.Description>
      </S.TextSection>
    </S.Wrapper>
  );
};
