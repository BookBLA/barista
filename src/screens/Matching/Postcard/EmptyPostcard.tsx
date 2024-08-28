import emptyPostcardIcon from '@assets/images/icons/EmptyPostcard.png';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import React from 'react';
import * as S from './EmptyPostcard.styles';
import { IPostcardProps } from './EmptyPostcard.types';

export const EmptyPostcard: React.FC<IPostcardProps> = () => {
  const { movePage } = useMovePage();
  return (
    <>
      <S.NonePostcardView>
        <S.NonePostcardImage source={emptyPostcardIcon} />
        <CustomText size="16px" font="fontMedium">
          받은 엽서가 없습니다
        </CustomText>
        <CustomText size="16px" font="fontMedium" style={{ marginBottom: 26 }}>
          먼저 엽서를 보내보세요!
        </CustomText>
        <CustomButton contents="엽서 보내러 가기" onPress={movePage('HomeStack')} />
      </S.NonePostcardView>
    </>
  );
};
