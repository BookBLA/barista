import * as S from '../InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { ProgressBarContainer, ProgressBarFill } from '../../../commons/components/ProgressBar/ProgressBar.styles';
import { View } from 'react-native';

export const TitleProgress = ({ gauge }: { gauge: number }) => {
  return (
    <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
      <S.SafeAreaViewStyled style={{ height: deviceHeight * 0.07 }}>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </View>
  );
};
