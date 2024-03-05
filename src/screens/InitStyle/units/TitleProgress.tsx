import * as S from '../../InitUserInfo/InitUserInfo.styles';
import { deviceHeight } from '../../../commons/utils/dimensions';
import { ProgressBarContainer, ProgressBarFill } from '../../../commons/components/ProgressBar/ProgressBar.styles';

export const TitleProgress = ({ gauge }: { gauge: number }) => {
  return (
    <>
      <S.SafeAreaViewStyled>
        <S.TitleStyled>스타일</S.TitleStyled>
      </S.SafeAreaViewStyled>
      <ProgressBarContainer>
        <ProgressBarFill progress={gauge} />
      </ProgressBarContainer>
    </>
  );
};
