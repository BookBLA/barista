import AsyncStorage from '@react-native-async-storage/async-storage';

const INSTALL_STATUS_KEY = 'installStatus';

// NOTE: 성진 - 아이폰 키체인 서비스에 토큰을 저장하기 때문에 앱을 삭제 했을 경우 토큰을 지우기 위해 사용

/**
 * 앱의 재설치 여부를 확인하는 함수
 *
 * @returns {Promise<boolean>} - true: 처음 설치되었거나 재설치된 경우, false: 이미 설치된 경우
 */
export const checkReinstallation = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(INSTALL_STATUS_KEY);
    if (value === null) {
      await AsyncStorage.setItem(INSTALL_STATUS_KEY, 'installed');
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
    return true;
  }
};

export const clearInstallStatus = async () => {
  try {
    await AsyncStorage.removeItem(INSTALL_STATUS_KEY);
  } catch (error) {
    console.error(error);
  }
};
