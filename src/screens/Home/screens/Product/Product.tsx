import { getMemberPostcardsApi } from '@commons/api/members/default/member.api';
import { postPaymentApi, postPaymentGoogleApi } from '@commons/api/payment/payment.api';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useMemberPostcardStore } from '@commons/store/members/postcard/useMemberPostcardStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, Platform, ScrollView, View } from 'react-native';
import {
  clearTransactionIOS,
  endConnection,
  finishTransaction,
  flushFailedPurchasesCachedAsPendingAndroid,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  useIAP,
  withIAPContext,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap';
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
  const { fetchMemberPostcard } = useMemberPostcardStore();

  const getProductsByID = async () => {
    try {
      await getProducts({ skus: ITEM_ID });
    } catch (error) {
      console.log('error', error);
    }
  };

  const { products, getProducts } = useIAP();

  useEffect(() => {
    if (products.length !== 0) {
      addProductInfo();
    }
  }, [products]);

  let purchaseUpdateSubscription = null;
  let purchaseErrorSubscription = null;

  useEffect(() => {
    Alert.alert('useEffect', 'useEffect');
    const connection = async () => {
      try {
        const init = await initConnection();
        const initCompleted = init === true;
        Alert.alert('init', init.toString());
        if (initCompleted) {
          if (Platform.OS === 'android') {
            await flushFailedPurchasesCachedAsPendingAndroid();
          } else {
            await clearTransactionIOS();
          }
        }

        // success listener
        purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase: ProductPurchase) => {
          const receipt = purchase.transactionReceipt ? purchase.transactionReceipt : purchase.purchaseToken;
          Alert.alert('purchaseUpdatedListener', JSON.stringify(purchase, null, 2));
          if (receipt) {
            try {
              setLoading(false);
              if (Platform.OS === 'android') {
                const response = await postPaymentGoogleApi(
                  purchase.productId as string,
                  purchase.purchaseToken as string,
                );
                Alert.alert('구글 결제', JSON.stringify(response, null, 2));
              } else if (Platform.OS === 'ios') {
                const response = await postPaymentApi(purchase.transactionId as string);
                Alert.alert('애플 결제', JSON.stringify(response, null, 2));
              }
              const ackResult = await finishTransaction({ purchase, isConsumable: true });
              Alert.alert('finishTransation', JSON.stringify(ackResult, null, 2));
              const response = await getMemberPostcardsApi();
              fetchMemberPostcard();
            } catch (error) {
              Alert.alert('ackError: ', JSON.stringify(error, null, 2));
            }
          }
        });

        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
          setLoading(false);

          // 정상적인 에러상황 대응
          const USER_CANCEL = 'E_USER_CANCELED';
          if (error && error.code === USER_CANCEL) {
            Alert.alert('구매 취소', '구매를 취소하셨습니다.');
          } else {
            // Alert.alert('구매 실패', '구매 중 오류가 발생하였습니다.');
            Alert.alert('구매 실패', JSON.stringify(error, null, 2));
          }
        });

        await getProductsByID();
        Alert.alert('getProductsByID', JSON.stringify(products));
      } catch (error) {
        console.log('connection error: ', error);
        Alert.alert('connection error', JSON.stringify(error));
      }
    };

    connection();

    return () => {
      if (purchaseUpdateSubscription) {
        purchaseUpdateSubscription.remove();
        purchaseUpdateSubscription = null;
      }

      if (purchaseErrorSubscription) {
        purchaseErrorSubscription.remove();
        purchaseErrorSubscription = null;
      }

      endConnection();
    };
  }, []);

  const addProductInfo = async () => {
    Alert.alert('addProductInfo', JSON.stringify(products));
    if (Platform.OS === 'android') {
      products.sort((a, b) => {
        return (
          Number(a.oneTimePurchaseOfferDetails?.priceAmountMicros) -
          Number(b.oneTimePurchaseOfferDetails?.priceAmountMicros)
        );
      });
    } else if (Platform.OS === 'ios') {
      products.sort((a, b) => {
        return Number(a.price) - Number(b.price);
      });
    }
    const addDiscount = products.map((product) => {
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
    <View style={{ flex: 1, paddingTop: 64 }}>
      {loading ? (
        <ActivityIndicator size="large" color={colors.primary} /> // 로딩 표시 추가
      ) : (
        <>
          <ScrollView style={{ flex: 1 }}>
            <CustomText
              size="10"
              font="fontRegular"
              color={colors.textGray4}
              style={{ marginBottom: 30, textAlign: 'center', lineHeight: 16, marginTop: '3%' }}
            >
              책갈피는 상대방에게 엽서를 보낼 때 사용됩니다. 매칭을 거절당할 시{`\n`}
              책갈피를 돌려드려요. 결제 후 7일 내 사용하지 않은 책갈피는 환불이 가능합니다.{`\n`}
              책갈피를 사용한 경우 환불 대상에서 제외되며, 잔여 책갈피의 부분 환불은 불가합니다.
            </CustomText>
            <S.BodyWrapper>
              <ProductList
                props={{
                  title: '무료 책갈피 받기',
                  name: '무료 책갈피 받기',
                  krwPrice: '광고 시청 후\n책갈피 10개 받기',
                  productId: 'ad_free_bookmarks',
                }}
                index={0}
              />
              {productID?.map((sale, index) => <ProductList key={sale.productId} props={sale} index={index + 1} />)}
            </S.BodyWrapper>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default withIAPContext(Product);
