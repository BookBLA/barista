import * as S from '../InitBook.styles';
import Warning from '../../../../assets/images/icons/Warning.png';
import { Text, View, Image } from 'react-native';
import { CustomText } from '../../../commons/components/TextComponents/CustomText/CustomText.styles';

export const NoSearch = () => {
  return (
    <>
      <Image source={Warning} style={{ width: 51, height: 51, marginBottom: 20 }} />
      <CustomText>
        ‘나미야 잡화점의 기적’에 대한 검색 결과가 없습니다.{'\n'}검색어의 철자가 정확한지 다시 한번 확인해 주세요.
      </CustomText>
    </>
  );
};
