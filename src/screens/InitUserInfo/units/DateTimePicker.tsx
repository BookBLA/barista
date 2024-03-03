// import React, { useState } from 'react';
// import { Text, View } from 'react-native';
// // import DatePicker from 'react-native-date-picker';
// import DatePicker from 'bamb14';
// import { ButtonStyled } from '../InitUserInfo.styles';
// import { colors } from '../../../commons/styles/variablesStyles';
// import { CustomModal } from '../../../commons/components/CustomModal/CustomModal';

// const DateTimePicker = () => {
//   const [date, setDate] = useState(new Date());

//   const dateString = date.toISOString();
//   console.log(dateString.slice(0, 10));
//   return (
//     <>
//       <CustomModal modalConfig={modalConfig}>
//         <DatePicker
//           value={date}
//           onChange={(value) => setDate(value)}
//           format={'yyyy-mm-dd'}
//           startYear={1980}
//           endYear={2024}
//         />
//       </CustomModal>
//       <View></View>
//     </>
//   );
// };

// export default DateTimePicker;
