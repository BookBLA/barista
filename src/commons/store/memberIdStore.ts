import * as SecureStore from 'expo-secure-store';

export const saveMemberId = async (token: string) => {
  await SecureStore.setItemAsync('memberId', token);
};

export const getMemberId = async () => {
  return await SecureStore.getItemAsync('memberId');
};
