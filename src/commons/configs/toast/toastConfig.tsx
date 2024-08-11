import React from 'react';
import CustomToast from '../../components/Feedbacks/CustomToast/CustomToast';

const toastConfig = {
  info: ({ text1 }: { text1?: string }) => <CustomToast text={text1} />,
};

export default toastConfig;
