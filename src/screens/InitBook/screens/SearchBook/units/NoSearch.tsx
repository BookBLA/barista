import { View, Image } from 'react-native';
import { CustomText } from '../../../../../commons/components/TextComponents/CustomText/CustomText.styles';
import { icons } from '../../../../../commons/utils/ui/variablesImages/variablesImages';

export const NoSearch = ({ search }: { search: string }) => {
  return (
    <View style={{ width: '100%', alignItems: 'center' }}>
      <Image source={icons.warning} style={{ width: 51, height: 51, marginBottom: 20 }} />
      <CustomText style={{ textAlign: 'center' }}>
        ‘{search}’에 대한 검색 결과가 없습니다.{'\n'}검색어의 철자가 정확한지 다시 한번 확인해 주세요.
      </CustomText>
    </View>
  );
};
