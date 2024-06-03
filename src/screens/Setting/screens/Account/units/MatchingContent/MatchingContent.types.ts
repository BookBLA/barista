import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  selected: string;
  reason: string;
  setSelected: Dispatch<SetStateAction<string>>;
  setReason: Dispatch<SetStateAction<string>>;
}
