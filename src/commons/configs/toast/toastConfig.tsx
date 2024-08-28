import CustomToast from '@commons/components/Feedbacks/CustomToast/CustomToast';
import React from 'react';

const toastConfig = {
  info: ({ text1 }: { text1?: string }) => <CustomToast text={text1} />,
};

export default toastConfig;
