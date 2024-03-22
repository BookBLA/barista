export interface IProps {
  children?: React.ReactNode;
  modalConfig: IModalConfig;
}

export interface IModalConfig {
  onClose: () => void;
  buttons?: IButtons[];
  close?: boolean;
  mode?: string;
  size?: string | number;
  visible: boolean;
  title?: React.ReactNode;
  contents?: React.ReactNode;
}
export interface IButtons {
  action: () => void;
  bgColor?: string;
  color?: string;
  label?: string;
  // size?: string | number;
  // font?: string;
  // weight?: string | number;
}

export interface IStyledProps extends Pick<IModalConfig, 'close' | 'size'> {}
