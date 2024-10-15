import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { useStyleStore } from '@commons/store/members/style/useStyle';
import { useUserStore } from '@commons/store/members/userinfo/useUserinfo';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { useSendbirdLogin } from '@commons/hooks/auths/successfulLogin/useSendbirdLogin';
import { Platform } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { useSendbirdChat } from '@sendbird/uikit-react-native';

export const useLogout = (logoutToggle: () => void) => {
  const removeToken = useAuthStore((state) => state.removeToken);
  const showToast = useToastStore((state) => state.showToast);
  const resetUserInfo = useUserStore((state) => state.resetUserInfo);
  const resetStyleInfo = useStyleStore((state) => state.resetStyleInfo);
  const resetMemberInfo = useMemberStore((state) => state.resetMemberInfo);
  const { handleSendbirdLogout } = useSendbirdLogin();
  const { sdk } = useSendbirdChat();

  const onClickLogout = () => {
    resetUserInfo();
    resetStyleInfo();
    resetMemberInfo();
    // if (Platform.OS === 'ios') {
    //   const token = await messaging().getAPNSToken();
    //   messaging().onTokenRefresh(async (newToken: string) => {
    //     console.debug('refresh token');
    //   });
    //   await sdk.unregisterAPNSPushTokenForCurrentUser(token ?? '');
    // } else {
    //   const token = await messaging().getToken();
    //   messaging().onTokenRefresh(async (newToken: string) => {
    //     console.debug('refresh token');
    //   });
    //   await sdk.unregisterFCMPushTokenForCurrentUser(token);
    // }
    handleSendbirdLogout();
    logoutToggle();
    showToast({
      content: '로그아웃 하였습니다.',
    });
    removeToken();
  };

  return {
    onClickLogout,
  };
};
