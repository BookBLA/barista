import { colors } from '@commons/styles/variablesStyles';
import Dash from 'react-native-dash';

export const DashDividerLine = ({ width, margin }: { width?: number; margin?: number }) => {
  return (
    <Dash
      style={{
        width: width ? `${width}%` : '85%',
        height: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: margin ? margin : 10,
        marginTop: margin ? margin : 10,
      }}
      dashGap={5}
      dashLength={5}
      dashThickness={1.5}
      dashColor={colors.lineDivider}
    />
  );
};
