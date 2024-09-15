import useMemberStore from '@commons/store/members/member/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);
  const { memberInfo } = useMemberStore();

  const getInitialRouteName = (memberStatusParam?: string) => {


    const routeMap: TRouteMap = {
      PROFILE: 'initUserinfoStack',
      APPROVAL: 'tapScreens', //학생증 인증 전
      STYLE: 'completePage',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens', //학생증 인증 후
      MATCHING_DISABLED: 'tapScreens',
      DEFAULT: 'loginStack',
      REJECT: 'rejectStudentId', //학생증 거절
    };
    console.log('memberInfo', memberInfo);
    if (memberInfo.schoolStatus === 'CLOSED') {
      return 'inviteFriend';
    } else return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];

    // return routeMap[memberStatusParam ?? memberStatus ?? 'DEFAULT'];
  };

  return getInitialRouteName;
};
