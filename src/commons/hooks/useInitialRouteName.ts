import useMemberStore from '../store/useMemberStore';

export const useInitialRouteName = () => {
  const memberStatus = useMemberStore((state) => state.memberInfo.memberStatus);

  const getInitialRouteName = () => {
    switch (memberStatus) {
      case 'p':
        return 'termsOfService';
      case 'a':
        return 'waitConfirm';
      case 's':
        return 'initStyleStack';
      case 'c':
        return 'tapScreens';
      default:
        return 'login';
    }
  };

  return getInitialRouteName;
};
