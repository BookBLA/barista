import * as SecureStore from 'expo-secure-store';

export interface ITokenStore {
  bookbla?: string;
  sendbird?: string;
}

export const saveToken = async (tokens: ITokenStore) => {
  if (tokens.bookbla) {
    await SecureStore.setItemAsync('accessToken', tokens.bookbla);
  }
  if (tokens.sendbird) {
    await SecureStore.setItemAsync('sendbirdToken', tokens.sendbird);
  }
};

export const getToken = async () => {
  const tokens: ITokenStore = {
    bookbla: (await SecureStore.getItemAsync('accessToken')) ?? '',
    sendbird: (await SecureStore.getItemAsync('sendbirdToken')) ?? '',
  };
  return tokens;
};
