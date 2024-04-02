import { useEffect, useState } from 'react';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import useManageMargin from '../../../../commons/hooks/useManageMargin';
import { colors } from '../../../../commons/styles/variablesStyles';
import * as S from '../../HomeStack.styles';
import Header from '../Home/units/Header/Header';

const Product = () => {
  const [timeLeft, setTimeLeft] = useState('');
  useManageMargin();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const tomorrow = new Date(now);
      tomorrow.setDate(tomorrow.getDate() + (now.getHours() >= 6 ? 1 : 0));
      tomorrow.setHours(6, 0, 0, 0);

      const diff = Number(tomorrow) - Number(now);

      const hours = String(Math.floor((diff / (1000 * 60 * 60)) % 24)).padStart(2, '0');
      const minutes = String(Math.floor((diff / (1000 * 60)) % 60)).padStart(2, '0');

      setTimeLeft(`${hours}:${minutes}`);
    }, 1000); // 타이머 시간 어떻게 조정할지 고민하기

    return () => clearInterval(timer);
  }, []);

  return (
    <S.Wrapper>
      <Header />
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
