import React from 'react';
import * as S from './EmptyPostcard.styles';
import emptyPostcardIcon from '../../../../assets/images/icons/EmptyPostcard.png';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { EType, IPostcardProps } from './EmptyPostcard.types';
import { CustomButton } from '../../../commons/components/CustomButton/CustomButton';

export const EmptyPostcard: React.FC<IPostcardProps> = ({ type }) => {
  return (
    <>
      <S.NonePostcardView>
        <S.NonePostcardImage source={emptyPostcardIcon}></S.NonePostcardImage>
        <CustomText size="16px" font="fontMedium">
          {type === EType.RECEIVE ? '받은 엽서가 없습니다.' : '보낸 엽서가 없습니다.'}
        </CustomText>
        <CustomText size="16px" font="fontMedium" style={{ marginBottom: 14 }}>
          {type === EType.RECEIVE ? '먼저 엽서를 보내보세요.' : '마음에 드는 이성에게 엽서를 보내보세요!'}
        </CustomText>
        <CustomButton contents="엽서 보내러 가기"></CustomButton>
      </S.NonePostcardView>
    </>
  );
};
