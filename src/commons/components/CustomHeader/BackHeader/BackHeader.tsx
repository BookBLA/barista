import { TouchableOpacity } from 'react-native-gesture-handler';
import backArrow from '../../../../../assets/images/icons/Back.png';
import useMovePage from '../../../hooks/useMovePage';
import { CustomText } from '../../CustomText/CustomText';
import { Image, View } from 'react-native';
import { IProps } from './BackHeader.types';

export const BackHeader: React.FC<IProps> = ({ title }) => {
  const { movePage } = useMovePage();

  return (
    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', height: '9%' }}>
      <TouchableOpacity onPress={movePage()}>
        <Image source={backArrow} style={{ width: 24, height: 24, marginLeft: 14 }} />
      </TouchableOpacity>
      <View
        style={{
          width: '80%',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          height: 'auto',
        }}
      >
        <CustomText size="14px">{title}</CustomText>
      </View>
    </View>
  );
};
