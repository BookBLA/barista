import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import _ from 'lodash';
import { useRef } from 'react';
import { Alert, Image, Platform, View } from 'react-native';
import { requestPurchase } from 'react-native-iap';
import productMask from '../../../../../../assets/images/icons/ProductMask.png';
import { CustomGradientButton } from '../../../../../commons/components/Inputs/CustomGradientButton/CustomGradientButton';
import { colors } from '../../../../../commons/styles/variablesStyles';
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
      Alert.alert('Purchase Success:', JSON.stringify(result, null, 2));
    } catch (err) {
      Alert.alert('requestPurchase 실패', JSON.stringify(err, null, 2));
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
        <Image source={productMask} style={{ width: 33, height: 42, marginRight: '10%', objectFit: 'contain' }} />
        <View
          style={{
            width: '70%',
            height: '80%',
            justifyContent: krwPrice ? 'space-between' : 'center',
          }}
        >
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
        </View>
      </S.ProductInfoContainer>
      {index === 0 ? (
        admobCount && admobCount > 0 ? (
          <CustomGradientButton contents={`무료 ${admobCount}/2`} onPress={handleGetRewardedAds} />
        ) : (
          <CustomButton contents={'무료 0/2'} disabled padding={'9px 18px'} />
        )
      ) : (
        <CustomButton contents={'구매하기'} onPress={() => debouncedBuy(productId)} />
      )}
    </S.ProductContentContainer>
  );
};

export default ProductListContent;
