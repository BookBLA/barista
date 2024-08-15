import { ProgressBarContainer, ProgressBarFill } from '@commons/components/Layouts/ProgressBar/ProgressBar.styles';
import { View } from 'react-native';

export const TitleProgress = ({ gauge }: { gauge: number }) => {
  return (
    <View
      style={{
        width: '100%',
        height: 'auto',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5,
      }}
    >
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </View>
  );
};
