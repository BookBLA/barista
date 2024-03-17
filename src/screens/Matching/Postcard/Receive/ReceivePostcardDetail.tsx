import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import prevButton from '../../../../../assets/images/buttons/prevButton.png';
import useMovePage from '../../../../commons/hooks/useMovePage';

const ReceivePostcardDetail = () => {
  const { movePage } = useMovePage();

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <TouchableOpacity onPress={movePage()}>
        <Image source={prevButton} />
      </TouchableOpacity>
      <Text style={{ fontSize: 30 }}> 으갹</Text>
    </View>
  );
};

export default ReceivePostcardDetail;
