import useMemberStore from '../store/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = (memberStatusParam?: string) => {
    // if (memberStatusParam) {
    //   switch (memberStatusParam) {
    //     case 'PROFILE':
    //       memberStatus = 'terms';
    //       break;
    //     case 'APPROVAL':
    //       memberStatus = 'a';
    //       break;
    //     case 'STYLE':
    //       memberStatus = 's';
    //       break;
    //     case 'BOOK':
    //       memberStatus = 'bo';
    //       break;
    //     case 'MATCHING_DISABLED':
    //     case 'COMPLETED':
    //       memberStatus = 'c';
    //       break;
    //     default:
    //       return 'loginStack';
    //   }
    // }
    // console.log('memberStatus', memberStatus); // p, a, s, bo, c, undefined (default: loginStack
    const routeMap: TRouteMap = {
      PROFILE: 'termsOfService',
      APPROVAL: 'waitConfirm',
      STYLE: 'initStyleStack',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens',
      MATCHING_DISABLED: 'tapScreens',
    };
    // console.log('routeMap', routeMap[memberStatus]);
    return routeMap[memberStatusParam ?? memberStatus] || 'loginStack';
  };

  return getInitialRouteName;
};
