import * as S from '../InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/ui/dimensions/dimensions';
import { View } from 'react-native';
import {
  ProgressBarContainer,
  ProgressBarFill,
} from '../../../commons/components/Layouts/ProgressBar/ProgressBar.styles';

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
