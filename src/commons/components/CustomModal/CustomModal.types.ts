export interface IProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  close: boolean;
  buttons?: IButtons[];
  mode?: TMode;
  size?: string | number;

  color?: string;
  width?: string;
  bgColor?: string;
}

export interface IButtons {
  label?: string;
  action: () => void;
  bgColor?: string;
  color?: string;
}

export type TMode = 'arrow' | 'round';
