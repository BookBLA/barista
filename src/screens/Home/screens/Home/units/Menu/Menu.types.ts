import { Dispatch, SetStateAction } from 'react';
import { TFilterKeys, TFilterState } from '../../../../HomeStack.types';

export interface IProps {
  handlePresentModalPress: (filterKey: TFilterKeys) => () => void;
  filter: TFilterState;
  setFilter: Dispatch<SetStateAction<TFilterState>>;
  setPage: Dispatch<SetStateAction<number>>;
  onReset: () => void;
}
