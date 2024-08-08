import { useEffect, useState } from 'react';
import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../commons/styles/variablesStyles';
import * as S from '../../HomeStack.styles';
import { calculateTimeLeft } from '../../../../commons/utils/calculateTimeLeft';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import Header from '../Home/units/Header/Header';
import useScreenLogger from '../../../../commons/hooks/useAnalyticsScreenLogger';
import ProductList from './components/ProductList';

const adCount = 1;
const SalesList = [
  {
    product: '무료 책갈피 받기',
    price: '광고 시청 후\n책갈피 10개 받기',
    buttonName: `무료 ${adCount}/2`,
    buttonAction: () => {},
  },
  {
    product: '책갈피 10개',
    price: '2,500원',
    buttonAction: () => {},
  },
  {
    product: '책갈피 35개',
    originalPrice: '7,500원',
    price: '7,000원',
    discount: '6%',
    buttonAction: () => {},
  },
  {
    product: '책갈피 80개',
    originalPrice: '20,000원',
    price: '14,400원',
    discount: '28%',
    buttonAction: () => {},
  },
  {
    product: '책갈피 150개',
    originalPrice: '37,500원',
    price: '22,500원',
    discount: '40%',
    buttonAction: () => {},
  },
];

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
        {/* <CustomText> 다음 무료 엽서 충전까지</CustomText>
        <CustomText size="80px" color={colors.primary}>
          {timeLeft}
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          엽서는 매일 06시에 1개씩 무료로 충전됩니다
        </CustomText>
        <CustomText size="14px" color={colors.textGray3}>
          엽서는 보낼 때와 받은 엽서를 확인 할 때 사용됩니다
        </CustomText> */}
        <CustomText
          size="10"
          font="fontRegular"
          color={colors.textGray4}
          style={{ marginBottom: 30, textAlign: 'center', lineHeight: 16 }}
        >
          책갈피는 상대방에게 엽서를 보낼 때 사용됩니다. 매칭을 거절당할 시{`\n`}
          책갈피를 돌려드려요. 결제 후 7일 내 사용하지 않은 책갈피는 환불이 가능합니다.{`\n`}
          책갈피를 사용한 경우 환불 대상에서 제외되며, 잔여 책갈피의 부분 환불은 불가합니다.
        </CustomText>
        {SalesList.map((sale, index) => (
          <ProductList key={sale.product} props={sale} index={index} />
        ))}
      </S.BodyWrapper>
    </S.Wrapper>
  );
};

export default Product;
