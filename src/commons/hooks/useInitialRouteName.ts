import useMemberStore from '../store/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const routeMap: TRouteMap = {
    p: 'termsOfService',
    a: 'waitConfirm',
    s: 'initStyleStack',
    bo: 'initBookStack',
    c: 'tapScreens',
  };

  const getInitialRouteName = () => routeMap[memberStatus] || 'loginStack';

  return getInitialRouteName;
};
