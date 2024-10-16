import { ProgressBarContainer, ProgressBarFill } from '@commons/components/Layouts/ProgressBar/ProgressBar.styles';
import { deviceHeight } from '@commons/utils/ui/dimensions/dimensions';
import * as S from '@screens/InitUserInfo/InitUserInfo.styles';
import { View } from 'react-native';

export const TitleProgress = ({ gauge }: { gauge: number }) => {
  return (
    <View style={{ width: '100%', height: 'auto', alignItems: 'center' }}>
      <S.SafeAreaViewStyled style={{ height: deviceHeight * 0.07 }}>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </View>
  );
};
