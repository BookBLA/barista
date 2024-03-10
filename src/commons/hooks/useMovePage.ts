import { useContext } from 'react';
import { NavigationContext, ParamListBase } from '@react-navigation/native';

const useMovePage = <T extends ParamListBase>() => {
  const navigation = useContext(NavigationContext);

  const goBack = () => {
    navigation?.canGoBack() ? navigation?.goBack() : navigation?.navigate('example');
  };

  const handleNext = (screenName: string, params?: T[keyof T]) => () => {
    navigation?.navigate(screenName, params);
    // params 수정 페이지 등록 페이지를 나눌 것을 고려하기 위해 매개변수로 받음
    // navigation?.navigate('InitUserInfoStack', { isEditing: true });
  };

  const movePage = (screenName?: string, params?: T[keyof T]) => () => {
    if (!screenName) {
      navigation?.canGoBack() ? navigation?.goBack() : navigation?.navigate('example');
      return;
    }
    navigation?.navigate(screenName, params);
  };

  // const push = (screenName: string, params?: any) => {
  //   navigation?.push(screenName, params);
  // };

  // const popToTop = () => {
  //   navigation?.popToTop();
  // };

  // const replace = (screenName: string, params?: any) => {
  //   navigation?.replace(screenName, params);
  // };

  // const reset = (state: any) => {
  //   navigation?.reset(state);
  // };

  return { goBack, handleNext, movePage };
};

export default useMovePage;
