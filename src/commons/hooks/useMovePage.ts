import { useContext } from 'react';
import { NavigationContext, ParamListBase } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

const useMovePage = <T extends ParamListBase>() => {
  const navigation = useContext(NavigationContext) as StackNavigationProp<ParamListBase>;

  const goBack = () => {
    navigation?.canGoBack() ? navigation?.goBack() : navigation?.navigate('tapScreens');
  };

  const handleNext = (screenName: string, params?: T[keyof T]) => () => {
    navigation?.navigate(screenName, params);
    // params 수정 페이지 등록 페이지를 나눌 것을 고려하기 위해 매개변수로 받음
    // navigation?.navigate('InitUserInfoStack', {screen: "genderBirth" ,params: { isEditing: true } });
  };

  const movePage = (screenName?: string, params?: T[keyof T]) => () => {
    if (!screenName) {
      goBack();
    } else {
      handleNext(screenName, params)();
    }
  };

  const handleReset = (screenName: string, params?: T[keyof T]) => {
    // 현재 스택을 제거하고 다른 화면으로 이동할 때 사용
    navigation?.reset({
      index: 0,
      routes: [{ name: screenName, params }],
    });
  };

  return { goBack, handleNext, movePage, handleReset };
};

export default useMovePage;
