import 'react-native-gesture-handler/jestSetup';

jest.mock('react-native-reanimated', () => require('react-native-reanimated/mock'));
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');
jest.mock('expo-constants', () => ({ manifest: { extra: {} } }));
jest.mock('expo-device', () => ({ getDeviceTypeAsync: jest.fn() }));
jest.mock('expo-secure-store', () => ({
  getItemAsync: jest.fn(),
  setItemAsync: jest.fn(),
  deleteItemAsync: jest.fn(),
}));
jest.mock('expo-clipboard', () => ({ getStringAsync: jest.fn(), setStringAsync: jest.fn() }));
jest.mock('expo-notifications', () => ({
  addNotificationReceivedListener: jest.fn(),
  removeNotificationSubscription: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
}));
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);
jest.mock('react-native/Libraries/EventEmitter/NativeEventEmitter');
jest.mock('react-native-toast-message', () => ({ show: jest.fn(), hide: jest.fn() }));
jest.mock('react-native-safe-area-context', () => {
  const SafeAreaContext = require('react-native-safe-area-context/jest/mock');
  return SafeAreaContext;
});
