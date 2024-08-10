import { View, Image } from 'react-native';
import { CustomText } from '../../../../../commons/components/TextComponents/CustomText/CustomText';
import { ProductProps } from './ProductList.types';
import { CustomButton } from '../../../../../commons/components/CustomButton/CustomButton';
import productMask from '../../../../../../assets/images/icons/ProductMask.png';
import { colors } from '../../../../../commons/styles/variablesStyles';
import adMask from '../../../../../../assets/images/icons/ADMask.png';
import { LinearGradient } from 'expo-linear-gradient';
import ProductListContent from './ProductListContent';

const ProductList: React.FC<ProductProps> = ({ props, index }) => {
  //   const { product, price, originalPrice, discount, buttonName, buttonAction } = props;

  return (
    <View style={{ width: '90%', height: 86, marginBottom: 10 }}>
      {index === 0 && (
        <Image
          source={adMask}
          style={{ width: '100%', height: 86, zIndex: 5, position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {index === 0 ? (
        <LinearGradient
          colors={['#AFDFF8', '#1BCEDF']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={{
            flexDirection: 'row',
            width: '100%',
            height: '100%',
            justifyContent: 'space-around',
            alignItems: 'center',
            padding: 1, // Adjust this value to change the thickness of the border
            borderRadius: 10, // Adjust as needed
          }}
        >
          <ProductListContent props={props} index={index} />
        </LinearGradient>
      ) : (
        <ProductListContent props={props} index={index} />
      )}
    </View>
  );
};
export default ProductList;
