import React from 'react';
import * as S from './EmptyPostcard.styles';
import emptyPostcardIcon from '../../../../assets/images/icons/EmptyPostcard.png';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText';
import { EType, IPostcardProps } from './EmptyPostcard.types';
import { CustomButton } from '../../../commons/components/CustomButton/CustomButton';
import useMovePage from '../../../commons/hooks/useMovePage';

export const EmptyPostcard: React.FC<IPostcardProps> = ({ type }) => {
  const { movePage } = useMovePage();
  return (
    <>
      <S.NonePostcardView>
        <S.NonePostcardImage source={emptyPostcardIcon} />
        <CustomText size="16px" font="fontMedium">
          {type === EType.RECEIVE ? '받은 엽서가 없습니다.' : '보낸 엽서가 없습니다.'}
        </CustomText>
        <CustomText size="16px" font="fontMedium" style={{ marginBottom: 14 }}>
          {type === EType.RECEIVE ? '먼저 엽서를 보내보세요.' : '마음에 드는 이성에게 엽서를 보내보세요!'}
        </CustomText>
        <CustomButton contents="엽서 보내러 가기" onPress={movePage('HomeStack')}></CustomButton>
      </S.NonePostcardView>
    </>
  );
};
