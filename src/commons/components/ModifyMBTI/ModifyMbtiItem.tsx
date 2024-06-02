import React from 'react';
import * as S from './ModifyMBTI.styles';
import { IProps } from './ModifyMbtiItem.types';
// import { useStyleStore } from '../../store/useStyle';

const ModifyMbtiItem = ({ name, setMbti, index, mbti, isSelect }: IProps) => {
  // console.log('name', name[0][0]);
  // console.log('mbti', mbti);
  // console.log('isSelect', isSelect);

  const [firstPart, secondPart] = name[0].split('\n');
  const [firstPart2, secondPart2] = name[1].split('\n');

  const handleSelect = (selectedName: string) => () => {
    if (mbti === selectedName) return;
    // setSelect((prev) => !prev);
    setMbti((prev) => {
      const newMbti = [...prev];
      newMbti[index] = selectedName;
      // console.log('newMbti', newMbti);
      return newMbti;
    });
  };

  return (
    <>
      <S.ColumnStyled>
        <S.ButtonStyled isSelect={isSelect}>
          <S.TextStyled
            isSelect={isSelect}
            isSmall={false}
            onPress={handleSelect(name[0][0])}
            style={{ marginBottom: 2 }}
          >
            {/* {name[0]} */}
            {firstPart}
          </S.TextStyled>
          <S.TextStyled isSelect={isSelect} isSmall onPress={handleSelect(name[0][0])}>
            {secondPart}
          </S.TextStyled>
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={!isSelect} onPress={handleSelect(name[1][0])}>
          {/* <S.TextStyled isSelect={!isSelect}>{name[1]}</S.TextStyled> */}
          <S.TextStyled
            isSelect={!isSelect}
            isSmall={false}
            onPress={handleSelect(name[1][0])}
            style={{ marginBottom: 2 }}
          >
            {firstPart2}
          </S.TextStyled>
          <S.TextStyled isSelect={!isSelect} isSmall onPress={handleSelect(name[1][0])}>
            {secondPart2}
          </S.TextStyled>
        </S.ButtonStyled>
      </S.ColumnStyled>
    </>
  );
};

export default ModifyMbtiItem;
