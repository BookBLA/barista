import { boolean, number, string } from 'yup';

export interface ModalProps {
  onClose: () => void;
  visible: boolean;
}

export interface IProps {
  index: number;
  data: string[];
  activeSlide?: number;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  onClose?: () => void;
}
