import { colors } from '@commons/styles/variablesStyles';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { ProductProps } from '../Product.types';
import ProductListContent from './ProductListContent';

const ProductList: React.FC<ProductProps> = ({ props, index, handleGetRewardedAds, admobCount }) => {
  useEffect(() => {
    if (index !== 0) {
      admobCount = 0;
      console.log(admobCount);
    }
  }, []);

  return (
    <View
      style={{
        width: '90%',
        height: 86,
        marginBottom: 16,
        backgroundColor: index === 0 && admobCount === 0 ? colors.textGray1 : 'white',
        borderRadius: 10,
      }}
    >
      {index === 0 && (
        <Image
          source={img.adMask}
          style={{ width: 38, height: 38, zIndex: 5, position: 'absolute', borderTopLeftRadius: 10, top: 0, left: 0 }}
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
            padding: 2,
            borderRadius: 10,
          }}
        >
          <ProductListContent
            props={props}
            index={index}
            admobCount={admobCount}
            handleGetRewardedAds={handleGetRewardedAds}
          />
        </LinearGradient>
      ) : (
        <View style={{ padding: 2, borderRadius: 10 }}>
          <ProductListContent props={props} index={index} admobCount={admobCount} />
        </View>
      )}
    </View>
  );
};
export default ProductList;
