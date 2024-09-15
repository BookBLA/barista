import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { initConnection, setup, useIAP, withIAPContext } from 'react-native-iap';
import { colors } from '../../../../commons/styles/variablesStyles';
import * as S from '../../HomeStack.styles';
import Header from '../Home/units/Header/Header';
import { ProductContentProps } from './Product.types';
import ProductList from './components/ProductList';

const ITEM_ID = ['bookmarks_10', 'bookmarks_150', 'bookmarks_35', 'bookmarks_80'];

const Product = () => {
  const showToast = useToastStore((state) => state.showToast);
  useScreenLogger();
  useHeaderControl({
    free: <Header />,
  });

  const [productID, setProductID] = useState<ProductContentProps[]>();
  const [loading, setLoading] = useState<boolean>(true);

  const getProductsByID = async () => {
    try {
      await getProducts({ skus: ITEM_ID });
    } catch (error) {
      console.log('error', error);
    }
  };

  const { products, getProducts} = useIAP();

  useEffect(() => {
    if (products.length !== 0) {
      addProductInfo();
    } else {
      initPurchase();
    }
  }, [products]);

  const initPurchase = async () => {
    try {
      setup({ storekitMode: 'STOREKIT2_MODE' });
      await initConnection();
      await getProductsByID();
    } catch (err) {
      console.error(err);
    }
  };

  const addProductInfo = async () => {
    console.log('products1', products);
    const sortProducts = products.sort((a, b) => {
      return Number(a.price) - Number(b.price);
    });
    const addDiscount = sortProducts.map((product) => {
      if (product.productId === 'bookmarks_10') {
        return { ...product, krwPrice: '2,500원' };
      } else if (product.productId === 'bookmarks_35') {
        return { ...product, discount: '6%', krwPrice: '7,000원', originalPrice: '7,500원' };
      } else if (product.productId === 'bookmarks_80') {
        return { ...product, discount: '28%', krwPrice: '14,400원', originalPrice: '20,000원' };
      } else if (product.productId === 'bookmarks_150') {
        return { ...product, discount: '40%', krwPrice: '22,500원', originalPrice: '37,500원' };
      }
    });
    setProductID(addDiscount);
    setLoading(false);
  };

  return (
    <S.Wrapper>
       {loading ? (
          <ActivityIndicator size="large" color={colors.primary} /> // 로딩 표시 추가
        ) : (
          <S.BodyWrapper>
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
                <ProductList
                  props={{
                    title: '무료 책갈피 받기',
                    krwPrice: '광고 시청 후\n책갈피 10개 받기',
                    productId: 'ad_free_bookmarks',
                  }}
                  index={0}
                />
                {productID?.map((sale, index) => (
                  <ProductList key={sale.productId} props={sale} index={index + 1} />
                ))}

          </S.BodyWrapper>
      )}
    </S.Wrapper>
  );
};

export default withIAPContext(Product);
