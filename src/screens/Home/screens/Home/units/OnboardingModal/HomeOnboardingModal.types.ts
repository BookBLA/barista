import { boolean } from 'yup';

export interface ModalProps {
  onClose: () => void;
  visible: boolean;
}
