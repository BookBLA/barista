import Constants from 'expo-constants';

export const getAppVersion = (): string => {
  const appVersion = Constants.manifest2?.extra?.expoClient?.version || Constants.expoConfig?.version || '0.1.0';
  return appVersion;
};
