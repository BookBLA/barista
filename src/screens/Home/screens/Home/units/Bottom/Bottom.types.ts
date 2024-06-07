import { Dispatch, SetStateAction } from 'react';
import { TFilterKeys, TFilterState } from '../../../../HomeStack.types';

export interface IProps {
  filter: TFilterState;
  setFilter: (filter: TFilterState) => void;
  selectedFilter: TFilterKeys;
  useBackHandler: () => void;
  setPage: Dispatch<SetStateAction<number>>;
  onReset: () => void;
}
