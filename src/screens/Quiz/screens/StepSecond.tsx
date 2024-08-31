import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import * as S from '@screens/Home/HomeStack.styles';
import * as T from '@screens/Quiz/QuizStack.styles';
import { Image } from 'react-native';
import { icons, img } from '@commons/utils/ui/variablesImages/variablesImages';
import React from 'react';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { useRoute } from '@react-navigation/native';
import { TProps } from '@screens/Quiz/QuizStack.types';
import { BookInfo } from '@screens/Quiz/units/BookInfo';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';

const StepSecond = () => {
  useScreenLogger();
  const { movePage } = useMovePage();
  const route = useRoute<TProps>();
  // @ts-ignore
  // const memberBookId = route.params['memberBookId'];

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
        <BookInfo params={route.params} key="" name="QuizStack" />
      </S.Wrapper>
    </>
  );
};

export default StepSecond;
