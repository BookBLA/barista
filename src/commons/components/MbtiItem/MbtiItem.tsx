import React, { useEffect, useState } from 'react';
import * as S from './MbtiItem.styles';
import { IProps } from './MbtiItem.types';
// import { useStyleStore } from '../../store/useStyle';

const MbtiItem = ({ name, setMbti, index }: IProps) => {
  const [isSelect, setSelect] = useState<boolean>(true);

  const [firstPart, secondPart] = name[0].split('\n');
  const [firstPart2, secondPart2] = name[1].split('\n');

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
        <S.ButtonStyled isSelect={isSelect}>
          <S.TextStyled
            isSelect={isSelect}
            isSmall={false}
            onPress={handleSelect(name[0][0])}
            style={{ marginBottom: 6 }}
          >
            {name[0]}
            {/* {firstPart} */}
          </S.TextStyled>
          {/* <S.TextStyled isSelect={isSelect} isSmall onPress={handleSelect(name[0][0])}> */}
          {/* {name[0]} */}
          {/* {secondPart} */}
          {/* </S.TextStyled> */}
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={isSelect === false} onPress={handleSelect(name[1][0])}>
          <S.TextStyled isSelect={isSelect === false}>{name[1]}</S.TextStyled>
          {/* <S.TextStyled
            isSelect={isSelect === false}
            isSmall={false}
            onPress={handleSelect(name[0][0])}
            style={{ marginBottom: 6 }}
          >
            {firstPart2}
          </S.TextStyled>
          <S.TextStyled isSelect={isSelect === false} isSmall onPress={handleSelect(name[0][0])}>
            {secondPart2}
          </S.TextStyled> */}
        </S.ButtonStyled>
      </S.RowStyled>
    </>
  );
};

export default MbtiItem;
