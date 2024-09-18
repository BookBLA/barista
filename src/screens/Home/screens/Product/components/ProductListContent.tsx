import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { Alert, Image, Platform, View } from 'react-native';
import { requestPurchase } from 'react-native-iap';
import productMask from '../../../../../../assets/images/icons/ProductMask.png';
import { CustomGradientButton } from '@commons/components/Inputs/CustomGradientButton/CustomGradientButton';
import { colors } from '@commons/styles/variablesStyles';
import * as S from '../Product.styles';
import { ProductProps } from '../Product.types';

const ProductListContent: React.FC<ProductProps> = ({ props, index, admobCount, handleGetRewardedAds }) => {
  const { title, krwPrice, discount, originalPrice, productId, name } = props;

  if (!admobCount) {
    admobCount = 0;
  }

  const buy = async (sku: string) => {
    Alert.alert('requestPurchase', sku);
    try {
      const result = await requestPurchase({
        sku,
        andDangerouslyFinishTransactionAutomaticallyIOS: false, // requestPurchase 호출 후 자동으로 finishTransaction을 호출할지 여부
      });
      Alert.alert('Purchase Success:', JSON.stringify(result, null, 2));
    } catch (err) {
      if (err && err.code === USER_CANCEL) {
        Alert.alert('구매 취소', '구매를 취소하셨습니다.');
      } else {
        Alert.alert('requestPurchase 실패', JSON.stringify(err, null, 2));
      }
    }
  };

  return (
    <S.ProductContentContainer index={index} admobCount={admobCount}>
      <S.ProductInfoContainer>
        <Image source={productMask} style={{ width: 33, height: 42, marginRight: '10%' }} />
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
          <CustomButton contents="무료 0/2" disabled padding="9px 18px" />
        )
      ) : (
        <CustomButton contents="구매하기" onPress={() => buy(productId)} padding="9px 18px" />
      )}
    </S.ProductContentContainer>
  );
};

export default ProductListContent;
