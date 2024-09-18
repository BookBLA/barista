import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import * as S from '@screens/Home/HomeStack.styles';
import * as T from '@screens/Quiz/QuizStack.styles';
import { Image, Keyboard, Text, View } from 'react-native';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import React, { useEffect, useState } from 'react';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { useRoute } from '@react-navigation/native';
import { TProps } from '@screens/Quiz/QuizStack.types';
import { BookInfo } from '@screens/Quiz/units/BookInfo';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { colors } from '@commons/styles/variablesStyles';
import { deviceHeight } from '@commons/utils/ui/dimensions/dimensions';

const StepSecond = () => {
  useScreenLogger();
  const { movePage } = useMovePage();
  const route = useRoute<TProps>();
  // @ts-ignore
  const memberBookId = route.params['memberBookId'];
  // @ts-ignore
  const targetMemberId = route.params['targetMemberId'];

  const [text, setText] = React.useState<string>('');
  const maxLength = 100;
  const handleTextChange = (inputText: string) => {
    if (inputText.length <= maxLength) {
      setText(inputText);
    }
  };

  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  useAppUIManager({
    setBackgroundColor: colors.primary,
  });
  useHeaderControl({ title: '독서 퀴즈' });
  return (
    <>
      <S.Wrapper style={{ alignItems: 'center' }}>
        <T.StepProgressBar>
          <T.StepLineSecond />
          <T.StepImage>
            <Image source={icons.previousStep} style={{ margin: 1, width: 14, height: 14 }} />
            <T.StepName style={{ opacity: 0.4 }}>Step 01</T.StepName>
          </T.StepImage>
          <T.StepImage>
            <Image source={icons.currentStep} style={{ width: 16, height: 16 }} />
            <T.StepName>Step 02</T.StepName>
          </T.StepImage>
          <T.StepImage>
            <Image source={icons.nextStep} style={{ margin: 1, width: 14, height: 14 }} />
            <T.StepName style={{ opacity: 0.4 }}>Step 03</T.StepName>
          </T.StepImage>
        </T.StepProgressBar>

        <View style={{ paddingTop: isKeyboardVisible ? deviceHeight * 0.05 : 0 }}>
          {!isKeyboardVisible && <BookInfo params={route.params} key="" name="QuizStack" />}
        </View>

        <T.ReadingQuizTestContainer>
          <T.QuizTitleContainer>
            <CustomText font="fontSemiBold" size="18px" color="black">
              상대방에게 인사말을 써보세요
            </CustomText>
          </T.QuizTitleContainer>

          <T.TextSection
            multiline
            value={text}
            onChangeText={handleTextChange}
            placehoder="첫 인사와 함께 이 책을 고른 이유를 알려주세요!"
            maxLength={maxLength}
          />
          <T.TextCount>
            <Text style={{ color: '#00000099' }}>{text.length}</Text>{' '}
            <Text style={{ color: '#00000066' }}>/ {maxLength}자</Text>
          </T.TextCount>
        </T.ReadingQuizTestContainer>

        {!isKeyboardVisible && (
          <T.NextButton
            onPress={movePage('stepThird', { memberBookId, targetMemberId, text })}
            style={{ opacity: text.length < 10 ? 0.3 : 1 }}
            disabled={text.length < 10}
          >
            <T.NextButtonText>다음</T.NextButtonText>
          </T.NextButton>
        )}
      </S.Wrapper>
    </>
  );
};

export default StepSecond;
