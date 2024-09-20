import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './BookInfo.styles';

const BookInfo = ({ memberData }: { memberData: MemberIntroResponse }) => {
  const { bookTitle, bookAuthors, review } = memberData ?? {};

  return (
    <S.Wrapper>
      <CustomText size="18px" font="fontBold">
        {bookTitle}
      </CustomText>
      <CustomText color={colors.textGray} margin="0 0 20px">
        {bookAuthors?.join('')}
      </CustomText>
      <S.QuoteWrapper align="start">
        <S.QuoteImage source={icons.quoteStart} />
      </S.QuoteWrapper>
      <CustomText margin="4px 0" size="14px" font="fontRegular">
        {review}
      </CustomText>

      <S.QuoteWrapper align="end">
        <S.QuoteImage source={icons.quoteEnd} />
      </S.QuoteWrapper>
    </S.Wrapper>
  );
};

export default BookInfo;
