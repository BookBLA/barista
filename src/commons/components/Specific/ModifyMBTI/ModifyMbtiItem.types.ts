import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  name: string[];
  setMbti: Dispatch<SetStateAction<string[]>>;
  index: number;
  isSelect: boolean;
  mbti: string;
}
