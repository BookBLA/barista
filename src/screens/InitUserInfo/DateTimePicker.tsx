import React, { useState } from 'react';
import { Text } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { ButtonStyled } from './InitUserInfo.styles';
import { colors } from '../../commons/styles/variablesStyles';

const DateTimePicker = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);

  return (
    <>
      <ButtonStyled onPress={() => setOpen(true)}>
        <Text style={{ color: colors.textGray2, fontFamily: 'fontMedium' }}>YYYY/MM/DD</Text>
      </ButtonStyled>
      <DatePicker
        modal
        mode="date"
        open={open}
        date={date}
        onConfirm={(date) => {
          setOpen(false);
          setDate(date);
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </>
  );
};

export default DateTimePicker;
