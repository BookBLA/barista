import DatePicker from '@dietime/react-native-date-picker';
import { View } from 'react-native';

const ModalContent = ({ date, setDate }: { date: Date; setDate: (value: Date) => void }) => {
  return (
    <>
      <View style={{ marginBottom: 43, marginTop: 27 }}>
        <DatePicker
          value={date}
          onChange={(value) => setDate(value)}
          format="yyyy-mm-dd"
          startYear={1980}
          endYear={2006}
          markWidth={97}
        />
      </View>
    </>
  );
};

export default ModalContent;
