import { IButtons } from '../CustomModal.types';

export interface IProps {
  buttons: IButtons[];
  mode: string;
}

export interface IStyledProps extends Omit<IButtons, 'action'> {
  width: string;
}
