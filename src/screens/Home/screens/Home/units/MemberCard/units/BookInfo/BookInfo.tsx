import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './BookInfo.styles';

const BookInfo = ({ memberData }: { memberData: MemberIntroResponse }) => {
  const rgba = (r: number, g: number, b: number, a: number) => `rgba(${r}, ${g}, ${b}, ${a})`;
  const { bookTitle, bookAuthors, review } = memberData ?? {};

  return (
    <S.Wrapper>
      <CustomText size="14px" font="fontSemiBold">
        {bookTitle}
      </CustomText>
      <CustomText size="12px" color={rgba(0, 0, 0, 0.5) as string} margin="3px 0 20px">
        {bookAuthors?.join('')}
      </CustomText>
      <S.ReviewWrapper>
        <S.QuoteWrapper align="start">
          <S.QuoteImage source={icons.quoteStart} />
        </S.QuoteWrapper>
        <CustomText margin="2px 0" size="14px" font="fontRegular">
          {review}
        </CustomText>

        <S.QuoteWrapper align="end">
          <S.QuoteImage source={icons.quoteEnd} />
        </S.QuoteWrapper>
      </S.ReviewWrapper>
    </S.Wrapper>
  );
};

export default BookInfo;
