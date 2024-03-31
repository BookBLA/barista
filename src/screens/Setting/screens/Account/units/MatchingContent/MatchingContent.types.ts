import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}
