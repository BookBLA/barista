import { TFilterKeys, TFilterState } from '@screens/Home/HomeStack.types';
import { Dispatch, SetStateAction } from 'react';

export interface IProps {
  handlePresentModalPress: (filterKey: TFilterKeys) => () => void;
  filter: TFilterState;
  setFilter: Dispatch<SetStateAction<TFilterState>>;
  setPage: Dispatch<SetStateAction<number>>;
  onReset: () => void;
}
