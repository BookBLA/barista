import React, { useState } from 'react';
import * as S from './MbtiItem.styles';
import { IProps } from './MbtiItem.types';

const MbtiItem = ({ name, setMbti, index, char }: IProps) => {
  const [isSelect, setSelect] = useState<boolean>(name[0][0] === char);

  const [firstPart, secondPart] = name[0].split('\n');
  const [firstPart2, secondPart2] = name[1].split('\n');

  const handleSelect = (selectedName: string) => () => {
    console.log('selectedName', selectedName);
    console.log('name[0][0]', name[0][0]);
    console.log('char', char);
    if (char === selectedName) return;
    else {
      // setSelected(selectedName);
      setSelect((prev) => !prev);
      setMbti((prev) => {
        const newMbti = [...prev];
        newMbti[index] = selectedName;
        return newMbti;
      });
    }
  };

  return (
    <>
      <S.RowStyled>
        <S.ButtonStyled isSelect={isSelect}>
          <S.TextStyled
            isSelect={isSelect}
            isSmall={false}
            onPress={handleSelect(name[0][0])}
            style={{ marginBottom: 5 }}
          >
            {/* {name[0]} */}
            {firstPart}
          </S.TextStyled>
          <S.TextStyled isSelect={isSelect} isSmall onPress={handleSelect(name[0][0])}>
            {/* {name[0]} */}
            {secondPart}
          </S.TextStyled>
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={isSelect === false} onPress={handleSelect(name[1][0])}>
          {/* <S.TextStyled isSelect={isSelect === false}>{name[1]}</S.TextStyled> */}
          <S.TextStyled
            isSelect={isSelect === false}
            isSmall={false}
            onPress={handleSelect(name[1][0])}
            style={{ marginBottom: 5 }}
          >
            {firstPart2}
          </S.TextStyled>
          <S.TextStyled isSelect={isSelect === false} isSmall onPress={handleSelect(name[1][0])}>
            {secondPart2}
          </S.TextStyled>
        </S.ButtonStyled>
      </S.RowStyled>
    </>
  );
};

export default MbtiItem;
