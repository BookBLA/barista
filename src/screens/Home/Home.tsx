import React, { useCallback, useMemo, useRef } from 'react';
import { Button, Text, View } from 'react-native';

import { SafeAreaViewStyled, TitleStyled } from './Home.styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Home = ({ navigation }: { navigation: any }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '50%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaViewStyled>
      <TitleStyled>BookBla</TitleStyled>
      <Button title="example" onPress={() => navigation.navigate('example')} />
      <Button title="example02" onPress={() => navigation.navigate('example02')} />
      <Button onPress={handlePresentModalPress} title="Present Modal" color="black" />
      <CustomBottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
        <View>
          <Text>BottomSheet 테스뚜! 🎉</Text>
        </View>
      </CustomBottomSheetModal>
    </SafeAreaViewStyled>
  );
};

export default Home;
