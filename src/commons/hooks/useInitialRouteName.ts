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
      default: // NOTE: 성진 - 명시적으로 사용
        return 'login';
    }
  };

  return getInitialRouteName;
};
