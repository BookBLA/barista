import { getMemberAdmobApi } from '@commons/api/members/admob/memberAdmob.adpi';
import { colors } from '@commons/styles/variablesStyles';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useState } from 'react';
import { Image, View } from 'react-native';
import adMask from '../../../../../../assets/images/icons/ADMask.png';
import { ProductProps } from '../Product.types';
import ProductListContent from './ProductListContent';

const ProductList: React.FC<ProductProps> = ({ props, index }) => {
  useEffect(() => {
    if (index === 0) {
      getAdmobCount();
    }
  }, []);

  const [admobCount, setAdmobCount] = useState<number>(0);
  const getAdmobCount = async () => {
    try {
      const response = await getMemberAdmobApi();
      setAdmobCount(response.result.admobCount ?? 0);
      // console.log('admobCount', response.result.admobCount);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View
      style={{
        width: '90%',
        height: 86,
        marginBottom: 10,
        backgroundColor: index === 0 && admobCount === 0 ? colors.textGray1 : 'white',
        borderRadius: 10,
      }}
    >
      {index === 0 && (
        <Image
          source={adMask}
          style={{ width: '100%', height: 86, zIndex: 5, position: 'absolute', top: 0, left: 0 }}
        />
      )}
      {admobCount > 0 ? (
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
          <ProductListContent props={props} index={index} admobCount={admobCount} />
        </LinearGradient>
      ) : (
        <ProductListContent props={props} index={index} admobCount={admobCount} />
      )}
    </View>
  );
};
export default ProductList;
