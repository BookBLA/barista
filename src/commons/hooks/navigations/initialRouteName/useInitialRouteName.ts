import useMemberStore from '@commons/store/members/member/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const { memberInfo } = useMemberStore();

  const getInitialRouteName = (memberStatusParam?: string, schoolStatus?: string) => {
    const routeMap: TRouteMap = {
      PROFILE: 'initUserinfoStack',
      APPROVAL: 'tapScreens', //학생증 인증 전
      STYLE: 'completePage',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens', //학생증 인증 후
      MATCHING_DISABLED: 'tapScreens',
      DEFAULT: 'loginStack',
      REJECTED: 'rejectStudentId', //학생증 거절
      p: 'initUserinfoStack',
      s: 'completePage',
      b: 'initBookStack',
      a: 'tapScreens',
      r: 'rejectStudentId',
      c: 'tapScreens',
      mb: 'tapScreens',
    };
    if (
      (memberStatusParam === 'STYLE' || memberStatus === 'STYLE') &&
      (memberInfo.schoolStatus === 'CLOSED' || schoolStatus === 'CLOSED')
    ) {
      return 'inviteFriends';
    } else {
      const status = memberStatusParam || memberStatus || 'DEFAULT';
      return routeMap[status];
    }

    // return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];
  };

  return getInitialRouteName;
};
