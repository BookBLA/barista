import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText.styles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { Image, View } from 'react-native';

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
