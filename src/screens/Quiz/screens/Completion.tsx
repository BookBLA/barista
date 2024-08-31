import * as S from '@screens/Home/HomeStack.styles';
import * as T from '@screens/Quiz/QuizStack.styles';
import { Text } from 'react-native';
import React from 'react';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';

const Completion = () => {
  const { movePage } = useMovePage();

  const isSuccess = false;

  return (
    <S.Wrapper style={{ alignItems: 'center' }}>
      <T.CompletionContainer>
        <T.CompletionImage source={isSuccess ? img.quizSuccess : img.quizFail} />
        <CustomText font="fontSemiBold" size="22px" color="black" style={{ textAlign: 'center', marginBottom: 14 }}>
          {isSuccess ? '엽서 보내기가 완료되었습니다' : '이번 독서퀴즈가\n조금 어려웠던 것 같습니다'}
        </CustomText>
        <CustomText font="fontMedium" size="14px" color="#00000099" style={{ textAlign: 'center' }}>
          {isSuccess
            ? '상대방이 엽서를 수락하면 채팅이 시작됩니다'
            : '이번에는 엽서를 보내지 못하지만\n다음에는 꼭 성공하실 거에요!'}
        </CustomText>
      </T.CompletionContainer>

      {/*onPress={() => handleReset('tapScreens', resetParams)*/}
      <T.NextButton onPress={movePage('home')}>
        <Text style={{ color: 'black', fontFamily: 'fontSemiBold', fontSize: 16 }}>확인</Text>
      </T.NextButton>
    </S.Wrapper>
  );
};

export default Completion;
