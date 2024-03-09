import React, { useState } from 'react';

import * as S from './MbtiItem.styles';
import { IProps } from './MbtiItem.types';

const MbtiItem = ({ name }: IProps) => {
  const [isSelect, setSelect] = useState<null | boolean>(null);

  // ButtonStyled 스타일 컴포넌트에게 props로 isSelect 값을 전달해 준다.
  // background-color: ${(props: IProps) => (props.isSelect ? 'yellow' : 'white')};
  // isSelect값이 트루일 때만 노랑색으로 변경해 준다.
  // 두번째 ButtonStyled 스타일 컴포넌트는 isSelect값이 false라면 true로 바꿔서 props로 전달해 준다.

  return (
    <>
      <S.RowStyled>
        <S.ButtonStyled isSelect={isSelect} onPress={() => setSelect(true)}>
          <S.TextStyled isSelect={isSelect} onPress={() => setSelect(true)}>
            {name[0]}
          </S.TextStyled>
        </S.ButtonStyled>
        <S.ButtonStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
          <S.TextStyled isSelect={isSelect === false} onPress={() => setSelect(false)}>
            {name[1]}
          </S.TextStyled>
        </S.ButtonStyled>
      </S.RowStyled>
    </>
  );
};

export default MbtiItem;
