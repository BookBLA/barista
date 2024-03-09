import React from 'react';
import { ProgressBarContainer, ProgressBarFill } from './ProgressBar.styles';

const ProgressBar = ({ progress }: { progress: number }) => {
  return (
    <ProgressBarContainer>
      <ProgressBarFill progress={progress} />
    </ProgressBarContainer>
  );
};

export default ProgressBar;
