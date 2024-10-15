import { postTestSignUp } from '@commons/api/example/example.api';
import { getMemberStatusesApi } from '@commons/api/members/default/member.api';
import { useInitialRouteName } from '@commons/hooks/navigations/initialRouteName/useInitialRouteName';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useGetPushToken from '@commons/hooks/notifications/getPushToken/useGetPushToken';
import { usePostPushToken } from '@commons/hooks/notifications/postPushToken/usePostPushToken';
import useAuthStore from '@commons/store/auth/auth/useAuthStore';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { EMemberStatus } from '@commons/types/memberStatus';

export const useTestLogin = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const showToast = useToastStore((state) => state.showToast);
  const { getPushToken } = useGetPushToken();
  const { movePage } = useMovePage();
  const { postPushToken } = usePostPushToken();
  const getInitialRouteName = useInitialRouteName();
  const updateMemberInfo = useMemberStore((state) => state.updateMemberInfo);

  const handleTestLogin = async () => {
    if (process.env.NODE_ENV !== 'development') return;
    try {
      const { result } = await postTestSignUp({
        email: 'munTest1@naver.com',
      });

      if (!result.accessToken) return;
      setToken({ bookbla: result.accessToken });

      const response = await getMemberStatusesApi();
      const { memberStatus } = response.result;

      if (memberStatus !== EMemberStatus.PROFILE) {
        const pushToken = await getPushToken();
        await postPushToken(pushToken || '');
      }

      let schoolStatus = null;
      if (memberStatus === EMemberStatus.STYLE) {
        //로그인 성공 시>memberStatus가 STYLE일 때>schoolStatus를 가져온다>updateMemberInfo로 schoolStatus를 업데이트한다
        // const response = await getMemberStatusesApi();
        updateMemberInfo('schoolStatus', 'OPEN');
        schoolStatus = response.result?.schoolStatus;
      }

      console.log('memberProfile', memberStatus);
      movePage(getInitialRouteName(memberStatus, schoolStatus as string))();
      showToast({ content: '테스트 로그인에 성공하였습니다.' });
    } catch (error) {
      console.error('error', error);
      showToast({ content: '테스트 로그인에 실패하였습니다.' });
    }
  };

  return { handleTestLogin };
};
