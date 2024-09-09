import { ReactNode } from 'react';

export interface IProps {
  children: ReactNode;
  index: number;
  snapPoints: string[];
  enableContentPanningGesture?: boolean;
}
