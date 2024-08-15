import { useInitialRouteName } from '@commons/hooks/navigations/initialRouteName/useInitialRouteName';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useGetPushToken from '@commons/hooks/notifications/getPushToken/useGetPushToken';
import { usePostPushToken } from '@commons/hooks/notifications/postPushToken/usePostPushToken';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';

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
