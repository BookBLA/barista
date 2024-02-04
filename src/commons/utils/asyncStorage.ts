import AsyncStorage from '@react-native-async-storage/async-storage';

export const getItem = async (key: string) => {
  const result = await AsyncStorage.getItem(key);
  return result && JSON.parse(result);
};

export const setItem = async (key: string, value: string) => {
  return await AsyncStorage.setItem(key, JSON.stringify(value));
};

export const removeItem = async (key: string) => {
  return await AsyncStorage.removeItem(key);
};