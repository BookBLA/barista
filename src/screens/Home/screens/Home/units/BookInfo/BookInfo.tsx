import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './BookInfo.styles';

const BookInfo = () => {
  return (
    <S.Wrapper>
      <CustomText size="18px" font="fontBold">
        나미야 잡화점의 기적
      </CustomText>
      <CustomText color={colors.textGray} margin="0 0 20px">
        하가시노 세이고
      </CustomText>
      <S.QuoteWrapper align="start">
        <S.QuoteImage source={icons.quoteStart} />
      </S.QuoteWrapper>
      <CustomText margin="4px 0" size="12px" font="fontRegular">
        하가시노 기적과 감동을 추리한다 하기시노 게이고의 차기 대표작으로 말할 수 있을 듯 기적과 감동을 추리한다
        하기시노 게이고의 차기 대표작으로 말할 수 있을 듯
      </CustomText>

      <S.QuoteWrapper align="end">
        <S.QuoteImage source={icons.quoteEnd} />
      </S.QuoteWrapper>
    </S.Wrapper>
  );
};

export default BookInfo;
