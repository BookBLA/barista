import { boolean, number, string } from 'yup';

export interface IDataItem {
  image: any;
  title: string;
  description: string;
  leftButtonText?: string;
  rightButtonText?: string;
  indexImage?: any;
}

export interface IProps {
  index: number;
  item: IDataItem;
  where: string;
  activeSlide?: number;
  onPrevSlide?: () => void;
  onNextSlide?: () => void;
  onClose?: () => void;
}
