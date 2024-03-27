import React, { useCallback, useMemo, useRef } from 'react';
import { Button, Text, View } from 'react-native';

import { SafeAreaViewStyled, TitleStyled } from './Example04.styles';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import CustomBottomSheetModal from '../../commons/components/CustomBottomSheetModal/CustomBottomSheetModal';
import { CustomButton } from '../../commons/components/CustomButton/CustomButton';

// type HomeScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Example04 = ({ navigation }: { navigation: any }) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ['30%', '80%'], []);
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaViewStyled>
      <TitleStyled>BookBla</TitleStyled>
      <Button title="example" onPress={() => navigation.navigate('example')} />
      <Button title="example02" onPress={() => navigation.navigate('example02')} />
      <CustomButton onPress={handlePresentModalPress} contents="Present Modal" />
      <CustomBottomSheetModal ref={bottomSheetModalRef} index={0} snapPoints={snapPoints}>
        <View>
          <Text>BottomSheet 테스뚜! 🎉</Text>
        </View>
      </CustomBottomSheetModal>
    </SafeAreaViewStyled>
  );
};

export default Example04;
