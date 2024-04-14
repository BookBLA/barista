import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  item: IItem;
  isSelected: boolean;
  onSelectBook: (item: IItem) => void;
}

export interface IItem {
  title: string;
  authors: string;
  imageUrl: string;
}
