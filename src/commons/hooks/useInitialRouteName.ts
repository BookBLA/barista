import useMemberStore from '../store/useMemberStore';

type TRouteMap = {
  [key: string]: string;
};

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = (memberStatusParam?: string) => {
    const routeMap: TRouteMap = {
      PROFILE: 'termsOfService',
      APPROVAL: 'waitConfirm',
      STYLE: 'initStyleStack',
      BOOK: 'initBookStack',
      COMPLETED: 'tapScreens',
      MATCHING_DISABLED: 'tapScreens',
    };
    return routeMap[memberStatusParam ?? memberStatus] || 'loginStack';
  };

  return getInitialRouteName;
};
