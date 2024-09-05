import { boolean, number } from 'yup';

export interface ModalProps {
  onClose: () => void;
  visible: boolean;
}

export interface IProps {
  index: number;
}
