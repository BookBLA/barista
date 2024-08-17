import { TAuthCode } from '@commons/api/auth/login.types';
import { useState } from 'react';

export const useAuthCode = () => {
  const [authCode, setAuthCode] = useState('');

  const getAuthCode = (data: TAuthCode) => {
    const exp = 'code=';
    const condition = data.indexOf(exp);
    if (condition !== -1) {
      const authorize_code = data.substring(condition + exp.length);
      setAuthCode(authorize_code);
    }
  };

  return {
    getAuthCode,
    authCode,
  };
};
