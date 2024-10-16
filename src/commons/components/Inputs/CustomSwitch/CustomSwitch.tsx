import { colors } from '@commons/styles/variablesStyles';
import _ from 'lodash';
import { Switch } from 'react-native-switch';
import { IProps } from './CustomSwitch.types';

export const CustomSwitch = ({ value, onValueChange }: IProps) => {
  const debouncedOnValueChange = _.debounce(onValueChange, 300);

  return (
    <Switch
      value={value}
      onValueChange={debouncedOnValueChange}
      circleSize={16}
      barHeight={20}
      circleBorderWidth={0}
      backgroundActive={colors.primary}
      backgroundInactive={colors.buttonAuthToggle}
      circleActiveColor="#fff"
      circleInActiveColor="#fff"
      renderActiveText={false}
      renderInActiveText={false}
      switchLeftPx={3}
      switchRightPx={3}
      switchWidthMultiplier={2}
    />
  );
};
