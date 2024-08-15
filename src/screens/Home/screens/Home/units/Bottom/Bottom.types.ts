import { TFilterKeys, TFilterState } from '@screens/Home/HomeStack.types';
import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  filter: TFilterState;
  setFilter: (filter: TFilterState) => void;
  selectedFilter: TFilterKeys;
  useBackHandler: (enable: boolean) => void;
  setPage: Dispatch<SetStateAction<number>>;
  onReset: () => void;
}
