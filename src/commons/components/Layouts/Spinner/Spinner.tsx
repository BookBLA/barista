import loading from '@assets/images/icons/loading.png';
import React, { useCallback, useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import * as S from './Spinner.styles';

const Spinner = () => {
  const animationValue = useRef(new Animated.Value(0)).current;

  const startAnimation = useCallback(() => {
    Animated.loop(
      Animated.timing(animationValue, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      { iterations: -1 }, // Infinite iterations
    ).start();
  }, [animationValue]);

  useEffect(() => {
    startAnimation();
  }, [startAnimation]);

  // inputRange : animationValue의 변화값
  // outputRange : 해당 변화값에 대한 매칭되는 deg 값
  const RotateData = animationValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <S.SpinnerContainer>
      <Animated.Image
        style={{
          transform: [{ rotate: RotateData }],
          width: 74,
          height: 74,
        }}
        source={loading}
      />
    </S.SpinnerContainer>
  );
};

export default Spinner;
