import React from 'react';
import { IDdata } from '../../../../HomeStack.types';
import * as S from './Item.styles';
import Profile from './units/../../Profile/Profile';

interface IItemProps {
  item: IDdata;
  index: number;
  dataLength: number;
  data: IDdata[];
}

const Item: React.FC<IItemProps> = ({ item, index, dataLength, data }) => {
  if (index % 2 === 0) {
    return (
      <React.Fragment key={index}>
        <S.RowWrapper>
          <Profile item={item} />
          {index + 1 < dataLength && <Profile item={data[index + 1]} />}
        </S.RowWrapper>
        <S.Line />
      </React.Fragment>
    );
  }
  return null;
};

export default Item;
