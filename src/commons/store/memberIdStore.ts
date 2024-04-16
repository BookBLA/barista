import * as SecureStore from 'expo-secure-store';

// TODO: 성진 - 사용하지 않을 예정
export const saveMemberId = async (token: string) => {
  await SecureStore.setItemAsync('memberId', token);
};

export const getMemberId = async () => {
  return await SecureStore.getItemAsync('memberId');
};
