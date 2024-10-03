import { getMemberStatusesApi } from '@commons/api/members/default/member.api';
import { useInitialRouteName } from '@commons/hooks/navigations/initialRouteName/useInitialRouteName';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useGetPushToken from '@commons/hooks/notifications/getPushToken/useGetPushToken';
import { usePostPushToken } from '@commons/hooks/notifications/postPushToken/usePostPushToken';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EErrorMessage } from '@commons/types/errorMessage';
import { EMemberStatus } from '@commons/types/memberStatus';
import { LoginResponse } from '@commons/types/openapiGenerator';

export const useSuccessfulLogin = () => {
  const showToast = useToastStore((state) => state.showToast);
  const setToken = useAuthStore((state) => state.setToken);
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);
  const getInitialRouteName = useInitialRouteName();
  const { handleReset } = useMovePage();
  const { getPushToken } = useGetPushToken();
  const { postPushToken } = usePostPushToken();

  const handleSuccessfulLogin = async (result: LoginResponse) => {
    if (!result.accessToken || !result.memberStatus) {
      throw new Error(EErrorMessage.INVALID_LOGIN_RESPONSE);
    }

    // TODO - 한결: sendbird 엑세스 토큰 저장
    setToken(result.accessToken);
    console.log('memberStatus: ', result.memberStatus);
    let schoolStatus = null;

    if (result.memberStatus !== EMemberStatus.PROFILE) {
      const pushToken = await getPushToken();
      await postPushToken(pushToken);
    }
    if (result.memberStatus === EMemberStatus.STYLE) {
      //로그인 성공 시>memberStatus가 STYLE일 때>schoolStatus를 가져온다>updateMemberInfo로 schoolStatus를 업데이트한다
      const response = await getMemberStatusesApi();
      updateMemberInfo('schoolStatus', response.result?.schoolStatus ?? 'OPEN');
      schoolStatus = response.result?.schoolStatus;
    }

    showToast({
      content: '로그인에 성공하였습니다.',
    });
    if (result.memberStatus === EMemberStatus.STYLE) {
      handleReset(getInitialRouteName(result.memberStatus, schoolStatus as string));
    } else handleReset(getInitialRouteName(result.memberStatus));
  };

  return handleSuccessfulLogin;
};
