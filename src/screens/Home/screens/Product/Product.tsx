import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { colors } from '@commons/styles/variablesStyles';
import { calculateTimeLeft } from '@commons/utils/dates/calculateTimeLeft/calculateTimeLeft';
import * as S from '@screens/Home/HomeStack.styles';
import { useEffect, useState } from 'react';
import Header from '../Home/units/Header/Header';

const Product = () => {
  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <S.Wrapper>
      <S.BodyWrapper>
        <CustomText> 다음 무료 엽서 충전까지</CustomText>
        <CustomText size="80px" color={colors.primary}>
          {timeLeft}
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          엽서는 매일 06시에 1개씩 무료로 충전됩니다
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          엽서는 보낼 때와 받은 엽서를 확인 할 때 사용됩니다
        </CustomText>
      </S.BodyWrapper>
    </S.Wrapper>
  );
};

export default Product;
