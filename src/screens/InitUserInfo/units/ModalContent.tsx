import DatePicker from 'bamb14';
import * as S from '../InitUserInfo.styles';
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
          endYear={2024}
          markWidth={97}
        />
      </View>
    </>
  );
};

export default ModalContent;
