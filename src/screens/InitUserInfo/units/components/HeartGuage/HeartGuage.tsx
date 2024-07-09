import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedProps,
  useDerivedValue,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const AnimatedRect = Animated.createAnimatedComponent(Rect);

const HeartGuage = ({ percentage }: { percentage: number }) => {
  const waveProgress1 = useSharedValue(0);
  const waveProgress2 = useSharedValue(0);

  React.useEffect(() => {
    waveProgress1.value = withRepeat(withTiming(1, { duration: 2000, easing: Easing.linear }), -1, true);
    waveProgress2.value = withRepeat(withTiming(1, { duration: 3000, easing: Easing.linear }), -1, true);
  }, []);

  const waveHeight1 = useDerivedValue(() => {
    return 10 * (1 - waveProgress1.value);
  });

  const waveHeight2 = useDerivedValue(() => {
    return 10 * waveProgress2.value;
  });

  const heartPath = `
    M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z
  `;

  const clipHeight = 24 * (1 - percentage / 100);

  const animatedProps1 = useAnimatedProps(() => ({
    y: clipHeight - waveHeight1.value,
  }));

  const animatedProps2 = useAnimatedProps(() => ({
    y: clipHeight - waveHeight2.value,
  }));

  return (
    <View style={styles.container}>
      <Svg height="100" width="100" viewBox="0 0 24 24">
        <Defs>
          <LinearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#ff7e5f" />
            <Stop offset="100%" stopColor="#feb47b" />
          </LinearGradient>
          <LinearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#6a11cb" />
            <Stop offset="100%" stopColor="#2575fc" />
          </LinearGradient>
          <ClipPath id="clip">
            <Path d={heartPath} />
          </ClipPath>
        </Defs>
        <Path d={heartPath} fill="none" stroke="#ff7e5f" strokeWidth="2" />
        <AnimatedRect
          x="0"
          animatedProps={animatedProps1}
          width="24"
          height="24"
          fill="url(#grad1)"
          clipPath="url(#clip)"
        />
        <AnimatedRect
          x="0"
          animatedProps={animatedProps2}
          width="24"
          height="24"
          fill="url(#grad2)"
          clipPath="url(#clip)"
          opacity={0.5}
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HeartGuage;
