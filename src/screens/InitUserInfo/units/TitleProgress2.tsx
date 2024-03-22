import * as S from '../InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { ProgressBarContainer, ProgressBarFill } from '../../../commons/components/ProgressBar/ProgressBar.styles';

export const TitleProgress2 = ({ gauge }: { gauge: number }) => {
  return (
    <>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>프로필</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </>
  );
};
