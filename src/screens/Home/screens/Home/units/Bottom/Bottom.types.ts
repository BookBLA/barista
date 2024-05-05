import { TFilterKeys, TFilterState } from '../../../../HomeStack.types';

export interface IProps {
  filter: TFilterState;
  setFilter: (filter: TFilterState) => void;
  selectedFilter: TFilterKeys;
  useBackHandler: () => void;
}
