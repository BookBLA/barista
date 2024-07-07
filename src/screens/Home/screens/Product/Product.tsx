import { useEffect, useState } from 'react';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../commons/styles/variablesStyles';
import * as S from '../../HomeStack.styles';
import { calculateTimeLeft } from '../../../../commons/utils/calculateTimeLeft';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import Header from '../Home/units/Header/Header';
import useScreenLogger from '../../../../commons/hooks/useAnalyticsScreenLogger';

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
        <CustomText> 다음 무료 책갈피 충전까지</CustomText>
        <CustomText size="80px" color={colors.primary}>
          {timeLeft}
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          책갈피는 매일 06시에 1개씩 무료로 충전됩니다
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          책갈피는 보낼 때와 받은 엽서를 확인 할 때 사용됩니다
        </CustomText>
      </S.BodyWrapper>
    </S.Wrapper>
  );
};

export default Product;
