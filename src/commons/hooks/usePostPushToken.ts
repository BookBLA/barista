import { postPushes } from '../api/memberToken.api';
import useToastStore from '../store/useToastStore';

export const usePostPushToken = () => {
  const showToast = useToastStore((state) => state.showToast);

  const postPushToken = async (token: string) => {
    try {
      await postPushes({
        token: token.split('[')[1].split(']')[0],
      });
    } catch (err) {
      showToast({
        content: `푸시토큰 전송애 실패하였습니다.`,
      });
      console.error(err);
    }
  };

  return {
    postPushToken,
  };
};
