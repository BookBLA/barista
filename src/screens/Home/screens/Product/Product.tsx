import { getReloadAdmobCount, postReloadAdmobUse } from '@commons/api/admob/reloadAdmob.api';
import { getMemberPostcardsApi } from '@commons/api/members/default/member.api';
import { postPaymentApi, postPaymentGoogleApi } from '@commons/api/payment/payment.api';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useMemberPostcardStore } from '@commons/store/members/postcard/useMemberPostcardStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { colors } from '@commons/styles/variablesStyles';
import { ProductContentProps } from '@screens/Home/screens/Product/Product.types';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Alert, EmitterSubscription, Platform, ScrollView, View } from 'react-native';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import {
  acknowledgePurchaseAndroid,
  endConnection,
  finishTransaction,
  initConnection,
  purchaseErrorListener,
  purchaseUpdatedListener,
  useIAP,
  withIAPContext,
  type ProductPurchase,
  type PurchaseError,
} from 'react-native-iap';
import * as S from '../../HomeStack.styles';
import Header from '../Home/units/Header/Header';
import ProductList from './components/ProductList';

export const ITEM_ID = ['bookmarks_10', 'bookmarks_150', 'bookmarks_35', 'bookmarks_80'];

const Product = () => {
  const showToast = useToastStore((state) => state.showToast);
  useScreenLogger();
  useHeaderControl({
    customContent: <Header />,
  });
  const [productID, setProductID] = useState<ProductContentProps[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const { fetchMemberPostcard } = useMemberPostcardStore();

  const { products, getProducts } = useIAP();

  const getProductsByID = async () => {
    try {
      await getProducts({ skus: ITEM_ID });
    } catch (error) {
      console.log('getProductsByID error: ', error);
      Alert.alert('오류 발생', '상품 정보를 가져오는데 실패하였습니다.');
    }
  };

  const addProductInfo = async () => {
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

  useEffect(() => {
    if (products.length !== 0) {
      addProductInfo();
    }
  }, [products]);

  useEffect(() => {
    let purchaseUpdateSubscription: EmitterSubscription | null = null; // 리스너 초기화
    let purchaseErrorSubscription: EmitterSubscription | null = null;

    let count = 1;

    const connection = async () => {
      try {
        const init = await initConnection();
        const initCompleted = init === true;
        // Alert.alert('init', init.toString());
        // if (initCompleted) {
        //   if (Platform.OS === 'android') {
        //     await flushFailedPurchasesCachedAsPendingAndroid();
        //   } else {
        //     await clearTransactionIOS();
        //   }
        // }

        purchaseUpdateSubscription = purchaseUpdatedListener(async (purchase: ProductPurchase) => {
          const receipt = purchase.transactionReceipt || purchase.purchaseToken;
          Alert.alert('purchaseUpdatedListener', count + JSON.stringify(purchase, null, 2));
          if (receipt) {
            try {
              // 이미 완료된 트랜잭션인지 확인
              if (purchase.isAcknowledgedAndroid || purchase.transactionId === undefined) {
                Alert.alert('Transaction already acknowledged', JSON.stringify(purchase, null, 2));
                return;
              }

              setLoading(true);
              if (Platform.OS === 'android') {
                const response = await postPaymentGoogleApi(
                  purchase.productId as string,
                  purchase.purchaseToken as string,
                );
                Alert.alert('구글 결제', count + JSON.stringify(response, null, 2));
              } else if (Platform.OS === 'ios') {
                const response = await postPaymentApi(purchase.transactionId as string);
                Alert.alert('애플 결제', JSON.stringify(response, null, 2));
              }
              const ackResult = await finishTransaction({ purchase: purchase, isConsumable: true });
              Alert.alert('finishTransaction', count + JSON.stringify(ackResult, null, 2));
              if (
                Platform.OS === 'android' &&
                purchase.productId === 'bookmarks_10' &&
                !purchase.isAcknowledgedAndroid &&
                purchase.purchaseToken
              ) {
                try {
                  const response = await acknowledgePurchaseAndroid({ token: purchase.purchaseToken });
                  Alert.alert('acknowledgePurchaseAndroid', count + JSON.stringify(response, null, 2));
                } catch (error) {
                  Alert.alert('acknowledgePurchaseAndroid: ', count + JSON.stringify(error, null, 2));
                }
              }
              fetchMemberPostcard();
              setLoading(false);
              count++;
            } catch (error) {
              Alert.alert('ackError: ', count + JSON.stringify(error, null, 2));
            }
          }
        });

        purchaseErrorSubscription = purchaseErrorListener((error: PurchaseError) => {
          // setLoading(false);

          // 정상적인 에러상황 대응
          const USER_CANCEL = 'E_USER_CANCELLED';
          if (error && error.code === USER_CANCEL) {
            Alert.alert('구매 취소', count + '구매를 취소하셨습니다.');
          } else {
            // Alert.alert('구매 실패', '구매 중 오류가 발생하였습니다.');
            Alert.alert('구매 실패', count + JSON.stringify(error, null, 2));
          }
          count++;
        });

        await getProductsByID();
      } catch (error) {
        console.log('connection error: ', error);
        Alert.alert('연결 오류', '연결에 실패하였습니다.');
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

  const advertiseUnitJson = JSON.parse(`${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_ADVERTISE_UNIT}`);
  const platform =
    Platform.OS === 'ios' ? advertiseUnitJson.ios.attendance_bookmark : advertiseUnitJson.android.attendance_bookmark;
  const adUnitId = platform === 'test' ? TestIds.REWARDED : platform;
  console.log(adUnitId);

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('Ad loaded');
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of ', reward);
      postReloadAdmobUse('FREE_BOOKMARK').then(() => {
        const response = getMemberPostcardsApi();
        fetchMemberPostcard();
      });
    });
    getAdmobCount();
    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [rewarded]);

  const [admobCount, setAdmobCount] = useState<number>(0);
  const getAdmobCount = async () => {
    try {
      getReloadAdmobCount().then((res) => {
        setAdmobCount(res.freeBookmarkAdmobCount ?? 0);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetRewardedAds = async () => {
    if (rewarded) {
      if (loaded) {
        try {
          rewarded.show();
        } catch {
          rewarded.load();
          showToast({
            content: '광고가 로딩중입니다.',
          });
        }
      } else {
        console.log('Ad is not loaded yet, loading ad...');
      }
    }
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
              color={'white'}
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
                  krwPrice: '광고 시청 후\n책갈피 2개 받기',
                  productId: 'ad_free_bookmarks',
                }}
                index={0}
                admobCount={admobCount}
                handleGetRewardedAds={handleGetRewardedAds}
              />
              {productID?.map((sale, index) => (
                <ProductList key={sale.productId} props={sale} index={index + 1} admobCount={0} />
              ))}
            </S.BodyWrapper>
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default withIAPContext(Product);
