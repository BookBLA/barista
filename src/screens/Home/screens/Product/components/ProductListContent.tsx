import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '@commons/styles/variablesStyles';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import _ from 'lodash';
import React, { useRef } from 'react';
import { Alert, Platform, View } from 'react-native';
import { requestPurchase } from 'react-native-iap';
import { ITEM_ID } from '../Product';
import * as S from '../Product.styles';
import { ProductProps } from '../Product.types';

const ProductListContent: React.FC<ProductProps> = ({ props, index, admobCount, handleGetRewardedAds }) => {
  const { title, krwPrice, discount, originalPrice, productId, name } = props;

  const buy = async (sku: string) => {
    Alert.alert('requestPurchase', sku);
    const skus = [ITEM_ID.find((item) => item === sku)?.toString() ?? ''];
    try {
      const result =
        Platform.OS === 'ios'
          ? await requestPurchase({ sku, andDangerouslyFinishTransactionAutomaticallyIOS: false })
          : await requestPurchase({ skus });
      // Alert.alert('Purchase Success:', JSON.stringify(result, null, 2));
    } catch (err) {
      // Alert.alert('requestPurchase 실패', JSON.stringify(err, null, 2));
    }
  };

  const isLoadingRef = useRef(false);
  const debouncedBuy = _.debounce(async (productId: string) => {
    if (isLoadingRef.current) {
      return;
    }
    isLoadingRef.current = true;
    await buy(productId);
    isLoadingRef.current = false;
  }, 500); // 0.5-second debounce

  return (
    <S.ProductContentContainer index={index} admobCount={admobCount}>
      <S.ProductInfoContainer>
        <S.BookMarkImage source={img.productMask} />
        <S.ProductTextContainer style={{ justifyContent: krwPrice ? 'space-between' : 'center' }}>
          <CustomText size="16" font="fontMedium">
            {Platform.OS === 'android' ? name : title}
          </CustomText>
          <View>
            {originalPrice && (
              <CustomText
                size="12"
                font="fontRegular"
                color={colors.textGray3}
                style={{ textDecorationLine: 'line-through' }}
              >
                {originalPrice}
              </CustomText>
            )}
            <View style={{ flexDirection: 'row' }}>
              {discount && (
                <CustomText size="12" font="fontBold" color={colors.errorMessageRed} style={{ marginRight: 4 }}>
                  {discount}
                </CustomText>
              )}
              {krwPrice && (
                <CustomText size="12" font="fontRegular">
                  {krwPrice}
                </CustomText>
              )}
            </View>
          </View>
        </S.ProductTextContainer>
      </S.ProductInfoContainer>
      {index === 0 ? (
        admobCount && admobCount > 0 ? (
          <S.GradientButton>
            <S.BuyButton onPress={handleGetRewardedAds} style={{ backgroundColor: 'transparent' }}>
              <S.BuyButtonText>무료 {admobCount}/2</S.BuyButtonText>
            </S.BuyButton>
          </S.GradientButton>
        ) : (
          <S.BuyButton style={{ backgroundColor: colors.buttonPrimary }} disabled>
            <S.BuyButtonText>무료 0/2</S.BuyButtonText>
          </S.BuyButton>
        )
      ) : (
        <S.BuyButton onPress={() => debouncedBuy(productId)} style={{ backgroundColor: colors.buttonPrimary }}>
          <S.BuyButtonText>구매하기</S.BuyButtonText>
        </S.BuyButton>
      )}
    </S.ProductContentContainer>
  );
};

export default ProductListContent;
