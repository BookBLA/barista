import Constants from 'expo-constants';

export const getAppVersion = (): string => {
  const appVersion = Constants.manifest?.version || Constants.manifest2?.extra?.expoClient?.version || '0.0.0';
  return appVersion;
};
