import { View, Image } from 'react-native';
import { CustomText } from '../../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { ProductProps } from './ProductList.types';
import { CustomButton } from '../../../../../commons/components/CustomButton/CustomButton';
import productMask from '../../../../../../assets/images/icons/ProductMask.png';
import { colors } from '../../../../../commons/styles/variablesStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { CustomGradientButton } from '../../../../../commons/components/CustomGradientButton/CustomGradientButton';

const adCount = 1;

const ProductListContent: React.FC<ProductProps> = ({ props, index }) => {
  const { product, price, originalPrice, discount, buttonAction } = props;

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        borderRadius: 9,
        borderColor: index === 0 ? 'transparent' : 'rgba(0, 0, 0, 0.05)',
        borderWidth: 1,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          width: '50%',
          height: '90%',
          alignItems: 'center',
        }}
      >
        <Image source={productMask} style={{ width: 33, height: 42, marginRight: '10%' }} />
        <View
          style={{
            width: '70%',
            height: '80%',
            justifyContent: price ? 'space-between' : 'center',
          }}
        >
          <CustomText size="16" font="fontMedium">
            {product}
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
              {price && (
                <CustomText size="12" font="fontRegular">
                  {price}
                </CustomText>
              )}
            </View>
          </View>
        </View>
      </View>
      {index === 0 ? (
        <CustomGradientButton contents={`무료 ${adCount}/2`} onPress={buttonAction} />
      ) : (
        <CustomButton contents={'구매하기'} onPress={buttonAction} />
      )}
    </View>
  );
};

export default ProductListContent;
