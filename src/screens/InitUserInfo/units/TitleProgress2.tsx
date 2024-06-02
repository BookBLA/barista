import * as S from '../InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { View } from 'react-native';
import { ProgressBarContainer, ProgressBarFill } from '../../../commons/components/ProgressBar/ProgressBar.styles';

export const TitleProgress2 = ({ gauge }: { gauge: number }) => {
  return (
    <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
      <S.SafeAreaViewStyled style={{ height: deviceHeight * 0.07 }}>
        <S.TitleStyled>프로필</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </View>
  );
};
