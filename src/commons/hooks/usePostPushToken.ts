import { postPushes } from '../api/memberToken.api';
import useToastStore from '../store/useToastStore';

export const usePostPushToken = () => {
  const showToast = useToastStore((state) => state.showToast);

  const postPushToken = async (token: string) => {
    try {
      const result = await postPushes({
        token,
      });
      showToast({
        content: `토큰을 보냈습니다. ${token}`,
      });
      console.log('result', result);
    } catch (err) {
      showToast({
        content: `토큰 전송애 실패하였습니다. ${token}`,
      });
      console.error(err);
    }
  };

  return {
    postPushToken,
  };
};
