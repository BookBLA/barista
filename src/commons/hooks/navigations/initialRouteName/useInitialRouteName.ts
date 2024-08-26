import useMemberStore from '@commons/store/members/member/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = (memberStatusParam?: string) => {
    const routeMap: TRouteMap = {
      PROFILE: 'initUserinfoStack',
      // APPROVAL: 'waitConfirm',
      STYLE: 'completePage',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens',
      MATCHING_DISABLED: 'tapScreens',
      DEFAULT: 'loginStack',
    };
    return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];
  };

  return getInitialRouteName;
  // const response = await getMemberStatusesApi();
  // const schoolStatus = response.result?.schoolStatus;

  // if (schoolStatus === 'CLOSED' && memberStatus === 'STYLE') {
  //   return 'inviteFriends';
  // } else return getInitialRouteName;
};
