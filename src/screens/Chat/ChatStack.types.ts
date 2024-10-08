import React from 'react';

export type MenuBarProps = {
  variant?: 'default' | 'contained';

  onPress: () => void;
  disabled?: boolean;
  visible?: boolean;

  icon: any;
  iconColor?: string;
  iconBackgroundColor?: string;
  name: string;

  actionLabel?: string;
  actionItem?: React.ReactNode;
};
