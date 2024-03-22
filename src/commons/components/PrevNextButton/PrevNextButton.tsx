import { TouchableOpacity, View, Image } from 'react-native';
import prevButton from '../../../assets/images/buttons/prevButton.png';
import nextButton from '../../../assets/images/buttons/nextButton.png';

const handlePrevious = () => {
  //navigation.navigate('genderBirth');
};

const handleNext = () => {};

export const PrevNextButton = () => {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}>
      <TouchableOpacity onPress={handlePrevious}>
        <Image source={prevButton} style={{ width: 11 }} />
      </TouchableOpacity>
      <TouchableOpacity onPress={handleNext}>
        <Image source={nextButton} style={{ width: 11 }} />
      </TouchableOpacity>
    </View>
  );
};
