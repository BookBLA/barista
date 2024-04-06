import React, { useState } from 'react';
import * as S from './ModifyMBTI.styles';
import { IProps } from './ModifyMbtiItem.types';
// import { useStyleStore } from '../../store/useStyle';

const ModifyMbtiItem = ({ name, setMbti, index }: IProps) => {
  const [isSelect, setSelect] = useState<boolean>(true);

  const handleSelect = (selectedName: string) => () => {
    setSelect((prev) => !prev);
    setMbti((prev) => {
      const newMbti = [...prev];
      newMbti[index] = selectedName;
      return newMbti;
    });
  };

  return (
    <>
      <S.ColumnStyled>
        <S.ButtonStyled isSelect={isSelect}>
          <S.TextStyled isSelect={isSelect} onPress={handleSelect(name[0][0])}>
            {name[0]}
          </S.TextStyled>
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={isSelect === false} onPress={handleSelect(name[1][0])}>
          <S.TextStyled isSelect={isSelect === false}>{name[1]}</S.TextStyled>
        </S.ButtonStyled>
      </S.ColumnStyled>
    </>
  );
};

export default ModifyMbtiItem;
