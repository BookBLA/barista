import useAuthStore from '../store/useAuthStore';
import useMemberStore from '../store/useMemberStore';
import useToastStore from '../store/useToastStore';
import { EMemberStatus } from '../types/memberStatus';
import useGetPushToken from './useGetPushToken';
import { useInitialRouteName } from './useInitialRouteName';
import useMovePage from './useMovePage';
import { usePostPushToken } from './usePostPushToken';

interface IResult {
  accessToken: string;
  memberStatus: string;
}

export const useSuccessfulLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const setToken = useAuthStore((state) => state.setToken);
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);
  const getInitialRouteName = useInitialRouteName();
  const { handleReset } = useMovePage();
  const { getPushToken } = useGetPushToken();
  const { postPushToken } = usePostPushToken();

  const handleSuccessfulLogin = async (result: IResult) => {
    setToken(result.accessToken);
    updateMemberInfo('memberStatus', result.memberStatus);

    if (result.memberStatus !== EMemberStatus.PROFILE) {
      const pushToken = await getPushToken();
      await postPushToken(pushToken);
    }

    showToast({
      content: '로그인에 성공하였습니다.',
    });
    handleReset(getInitialRouteName(result.memberStatus));
  };

  return handleSuccessfulLogin;
};
