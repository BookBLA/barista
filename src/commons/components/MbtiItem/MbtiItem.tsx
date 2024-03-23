import React, { useState } from 'react';
import * as S from './MbtiItem.styles';
import { IProps } from './MbtiItem.types';
import { useStyleStore } from '../../store/useStyle';

const MbtiItem = ({ name, setMbti, index }: IProps) => {
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
      <S.RowStyled>
        <S.ButtonStyled
          isSelect={isSelect}
          // onPress={() => {
          //   setSelect(true);
          //   // updateStyleInfo('mbtiList', name[0]);
          // }}
        >
          <S.TextStyled isSelect={isSelect} onPress={handleSelect(name[0][0])}>
            {name[0]}
          </S.TextStyled>
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={isSelect === false} onPress={handleSelect(name[1][0])}>
          <S.TextStyled isSelect={isSelect === false}>{name[1]}</S.TextStyled>
        </S.ButtonStyled>
      </S.RowStyled>
    </>
  );
};

export default MbtiItem;
