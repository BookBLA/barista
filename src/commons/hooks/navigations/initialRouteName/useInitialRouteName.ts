import useMemberStore from '@commons/store/members/member/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = (memberStatusParam?: string) => {
    // let schoolStatus: string | undefined;

    // if (memberStatus === 'STYLE') {
    //   const response = await getMemberStatusesApi();
    //   schoolStatus = response.result?.schoolStatus;
    // }

    const routeMap: TRouteMap = {
      PROFILE: 'initUserinfoStack',
      // APPROVAL: 'waitConfirm',
      STYLE: 'completePage',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens',
      MATCHING_DISABLED: 'tapScreens',
      DEFAULT: 'loginStack',
    };

    // if (schoolStatus === 'CLOSED' && memberStatus === 'STYLE') {
    //   return 'inviteFriends';
    // } else return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];

    return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];
  };

  return getInitialRouteName;
};
