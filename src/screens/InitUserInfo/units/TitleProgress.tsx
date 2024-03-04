import { View } from 'react-native';
import ProgressBar from '../../../commons/components/ProgressBar/ProgressBar';
import * as S from '../InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { ProgressBarContainer, ProgressBarFill } from '../../../commons/components/ProgressBar/ProgressBar.styles';

export const TitleProgress = ({ gauge }: { gauge: number }) => {
  return (
    <>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>정보 입력</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </>
  );
};
