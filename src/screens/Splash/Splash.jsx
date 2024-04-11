import { logos } from '../../commons/utils/variablesImages';
import { colors } from '../../commons/styles/variablesStyles';
import { View, Image } from 'react-native';
import useManageMargin from '../../commons/hooks/useManageMargin';
import useMovePage from '../../commons/hooks/useMovePage';

const Splash = () => {
  useManageMargin();
  const { movePage } = useMovePage();

  setTimeout(() => {
    movePage('login');
  }, 1500);

  return (
    <View
      style={{
        backgroundColor: colors.primary,
        display: 'flex',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image source={logos.mainLogoLight} style={{ width: 191, height: 137 }} />
    </View>
  );
};

export default Splash;
