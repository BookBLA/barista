import { BookSearchResponse } from '@commons/types/openapiGenerator';
import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  item: BookSearchResponse;
  isSelected: boolean;
  onSelectBook: Dispatch<SetStateAction<BookSearchResponse>>;
}

export interface IItem {
  title: string;
  authors: string;
  imageUrl: string;
}
