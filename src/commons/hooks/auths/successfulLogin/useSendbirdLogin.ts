import { LoginResponse } from '@commons/types/openapiGenerator';
import useToastStore from '@commons/store/ui/toast/useToastStore';

import { useConnection } from '@sendbird/uikit-react-native';

export const useSendbirdLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const { connect, disconnect } = useConnection();

  const handleSendbirdLogin = async (result: LoginResponse) => {
    if (!result.sendbirdToken) {
      return;
    }
    try {
      // @ts-ignore
      await connect(result.memberId?.toString(), { accessToken: result.accessToken });
    } catch (error) {
      console.error(error);
      showToast({
        content: '채팅 서버에 연결할 수 없습니다.',
      });
    }
  };

  const handleSendbirdLogout = async () => {
    try {
      await disconnect();
    } catch (error) {
      console.error(error);
    }
  };

  return { handleSendbirdLogin, handleSendbirdLogout };
};
