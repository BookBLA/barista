import { postPushes } from '@commons/api/members/token/memberToken.api';
import useToastStore from '@commons/store/ui/toast/useToastStore';

export const usePostPushToken = () => {
  const showToast = useToastStore((state) => state.showToast);

  const postPushToken = async (token: string) => {
    try {
      await postPushes({
        token: token.split('[')[1].split(']')[0],
      });
    } catch (err) {
      showToast({
        content: `푸시토큰 전송에 실패하였습니다.`,
      });
      console.error(err);
    }
  };

  return {
    postPushToken,
  };
};
