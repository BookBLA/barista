import { postPaymentApi } from '@commons/api/payment/payment.api';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { useEffect } from 'react';
import { Alert, Image, Platform, View } from 'react-native';
import RNIap, { ProductPurchase, requestPurchase, useIAP } from 'react-native-iap';
import productMask from '../../../../../../assets/images/icons/ProductMask.png';
import { CustomGradientButton } from '../../../../../commons/components/Inputs/CustomGradientButton/CustomGradientButton';
import { colors } from '../../../../../commons/styles/variablesStyles';
import * as S from '../Product.styles';
import { ProductProps } from '../Product.types';

const ProductListContent: React.FC<ProductProps> = ({ props, index, admobCount }) => {
  const { title, krwPrice, discount, originalPrice, productId } = props;
  const { finishTransaction, currentPurchase } = useIAP();

  const buy = async (sku: string) => {
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
            Alert.alert('구매 실패', '구매 중 오류가 발생하였습니다.');
          }
    }
  };

  const postPayment=async(transactionId: string)=>{
    try{
      let payType='apple';
      if(Platform.OS === 'android') payType='google';
      const response =await postPaymentApi(payType, transactionId);
      Alert.alert(payType,'postPaymentApi'+JSON.stringify(response, null, 2));
    }catch(err){
      Alert.alert('postPaymentApi error', JSON.stringify(err, null, 2));
    }
  };

  useEffect(() => {
    const checkCurrentPurchase = async (purchase: ProductPurchase): Promise<void> => {
      if (purchase) {
        try {
          await postPayment(purchase.transactionId as string);
          const ackResult = await finishTransaction({ purchase });
          // andDangerouslyFinishTransactionAutomaticallyIOS 값이 false이기 때문에,
          // requestPurchase 호출 후 finishTransaction을 수동으로 호출해야만 결제가 완료된다.
          Alert.alert('finishTransation',JSON.stringify(ackResult, null, 2));
          RNIap.endConnection();
        } catch (err) {
          console.error(err);
          if (err && err.code === USER_CANCEL) {
            Alert.alert('구매 취소', '구매를 취소하셨습니다.');
          } else {
            Alert.alert('구매 실패', '구매 중 오류가 발생하였습니다.');
          }
        }
      }
    };
    if (currentPurchase) {
      checkCurrentPurchase(currentPurchase);
    }
  }, [currentPurchase, finishTransaction]);

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
            {title}
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
        admobCount &&
          admobCount > 0 ? (
            <CustomGradientButton contents={`무료 ${admobCount}/2`} onPress={() => console.log('애드몹 시청')} />
          ) : (
            <CustomButton contents={'무료 0/2'} disabled padding={'9px 18px'}/>
          )
        ) : (
            <CustomButton contents={'구매하기'} onPress={() => buy(productId)} padding={'9px 18px'}/>
        )}
    </S.ProductContentContainer>
  );
};

export default ProductListContent;
