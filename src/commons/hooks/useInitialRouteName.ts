import useMemberStore from '../store/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  let memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = (memberStatusParam?: string) => {
    if (memberStatusParam) {
      switch (memberStatusParam) {
        case 'PROFILE':
          memberStatus = 'p';
          break;
        case 'APPROVAL':
          memberStatus = 'a';
          break;
        case 'STYLE':
          memberStatus = 's';
          break;
        case 'BOOK':
          memberStatus = 'bo';
          break;
        case 'MATCHING_DISABLED':
        case 'COMPLETED':
          memberStatus = 'c';
          break;
        default:
          return 'loginStack';
      }
    }
    // console.log('memberStatus', memberStatus); // p, a, s, bo, c, undefined (default: loginStack
    const routeMap: TRouteMap = {
      p: 'termsOfService',
      a: 'waitConfirm',
      s: 'initStyleStack',
      bo: 'initBookStack',
      c: 'tapScreens',
    };
    // console.log('routeMap', routeMap[memberStatus]);
    return routeMap[memberStatus];
  };

  return getInitialRouteName;
};
