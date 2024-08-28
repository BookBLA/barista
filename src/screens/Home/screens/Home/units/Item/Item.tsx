import { IDdata } from '@screens/Home/HomeStack.types';
import React from 'react';
import Profile from '../Profile/Profile';
import * as S from './Item.styles';

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
