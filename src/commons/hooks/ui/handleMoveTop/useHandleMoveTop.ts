import { useRef } from 'react';
import { ScrollView } from 'react-native-gesture-handler';

export const useHandleMoveTop = () => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleMoveTop = (x = 0, y = 0, animated = true) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ x, y, animated });
    }
  };

  return {
    handleMoveTop,
    scrollViewRef,
  };
};
