import Dash from 'react-native-dash';
import { colors } from '../../styles/variablesStyles';

export const DashDividerLine = () => {
  return (
    <Dash
      style={{
        width: '85%',
        height: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 10,
        marginTop: 10,
      }}
      dashGap={5}
      dashLength={5}
      dashThickness={1.5}
      dashColor={colors.lineDivider}
    />
  );
};
