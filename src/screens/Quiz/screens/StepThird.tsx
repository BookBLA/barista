import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import { AxiosError } from 'axios';
import _ from 'lodash';

import * as T from '@screens/Quiz/QuizStack.styles';

import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { icons, img } from '@commons/utils/ui/variablesImages/variablesImages';
import { TProps } from '@screens/Quiz/QuizStack.types';
import { BookInfo } from '@screens/Quiz/units/BookInfo';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { TPostcardInfo } from '@screens/Library/SendPostcardModal/SendPostcardModal.types';
import { getPostcardTypeList } from '@commons/api/postcard/library.api';
import { postPostcardSend } from '@commons/api/quiz/sendPostcard.api';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import useAnalyticsEventLogger from '@commons/hooks/analytics/analyticsEventLogger/useAnalyticsEventLogger';
import useAppUIManager from '@commons/hooks/ui/appUIManager/useAppUIManager';
import { colors } from '@commons/styles/variablesStyles';
import useMemberStore from '@commons/store/members/member/useMemberStore';
import { CreateChat } from '@screens/Quiz/hooks/CreateChat';
import { useSendbirdChat } from '@sendbird/uikit-react-native';
import { GroupChannel } from '@sendbird/chat/groupChannel';

const StepThird = () => {
  useScreenLogger();
  const { sdk } = useSendbirdChat();
  const { movePage } = useMovePage();
  const route = useRoute<TProps>();
  const logEvent = useAnalyticsEventLogger();
  const memberId = useMemberStore((state) => state.memberInfo.id);
  const memberName = useMemberStore((state) => state.memberInfo.name);

  const [postcardTypeInfoList, setPostcardTypeInfoList] = useState<TPostcardInfo[]>([]);
  const [currentPressedPostcard, setCurrentPressedPostcard] = useState<TPostcardInfo>();

  const fetchPostcardInfo = async () => {
    const result = await getPostcardTypeList();
    setPostcardTypeInfoList(result);
  };

  const selectPostcard = (postcardId: TPostcardInfo) => {
    setCurrentPressedPostcard(postcardId);
  };

  const sendPostCard = _.debounce(async () => {
    const postcardInfo = {
      postcardTypeId: currentPressedPostcard?.postcardTypeId!,
      receiveMemberId: route.params.targetMemberId,
      receiveMemberBookId: route.params.memberBookId,
      memberReply: route.params.text ?? '',
    };
    let channel: GroupChannel;
    try {
      channel = await CreateChat(postcardInfo, memberId, memberName, sdk);
      await postPostcardSend(postcardInfo, channel.url); // 채팅방 생성 완료 후 postcard 전송, bookmark 소모
      logEvent('send_postcard');
      movePage('completion', { isPassQuiz: true })();
    } catch (error) {
      const { response } = error as unknown as AxiosError<AxiosError>;
      if (response) {
        // @ts-ignore
        if (channel) {
          await channel.delete();
        }
        console.log(response.data, response.status);
        useToastStore.getState().showToast({ content: `엽서 보내기에 실패했습니다.\n${response.data.message}` });
      }
    }
  }, 500);

  useEffect(() => {
    fetchPostcardInfo();
  }, []);

  useAppUIManager({
    setBackgroundColor: colors.primary,
  });
  useHeaderControl({ title: '엽서 고르기' });
  return (
    <T.Wrapper style={{ alignItems: 'center' }}>
      <T.StepProgressBar>
        <T.StepLineThird />
        <T.StepImage>
          <Image source={icons.previousStep} style={{ margin: 1, width: 14, height: 14 }} />
          <T.StepName style={{ opacity: 0.4 }}>Step 01</T.StepName>
        </T.StepImage>
        <T.StepImage>
          <Image source={icons.previousStep} style={{ margin: 1, width: 14, height: 14 }} />
          <T.StepName style={{ opacity: 0.4 }}>Step 02</T.StepName>
        </T.StepImage>
        <T.StepImage>
          <Image source={icons.currentStep} style={{ width: 16, height: 16 }} />
          <T.StepName>Step 03</T.StepName>
        </T.StepImage>
      </T.StepProgressBar>

      <BookInfo params={route.params} key="" name="QuizStack" />

      <T.ReadingQuizTestContainer>
        <T.QuizTitleContainer>
          <CustomText font="fontSemiBold" size="18px" color="black">
            엽서 뒷면 디자인을 골라주세요
          </CustomText>
        </T.QuizTitleContainer>

        <T.PostCardImageListWrapper>
          {postcardTypeInfoList?.map((postcardInfo) => (
            <TouchableWithoutFeedback key={postcardInfo.postcardTypeId} onPress={() => selectPostcard(postcardInfo)}>
              <T.PostCardImageWrapper>
                <T.PostCardImage source={{ uri: postcardInfo.postcardImageUrl }} />
                {currentPressedPostcard?.postcardTypeId === postcardInfo.postcardTypeId && (
                  <T.PostCardSelectedBackground>
                    <T.PostCardSelectedImage source={img.postcardSelected} />
                  </T.PostCardSelectedBackground>
                )}
              </T.PostCardImageWrapper>
            </TouchableWithoutFeedback>
          ))}
        </T.PostCardImageListWrapper>
      </T.ReadingQuizTestContainer>

      <View style={{ flexGrow: 1 }} />

      <T.NextButton
        onPress={sendPostCard}
        style={{ opacity: !currentPressedPostcard ? 0.3 : 1 }}
        disabled={!currentPressedPostcard}
      >
        <T.NextButtonText>엽서 보내기 </T.NextButtonText>
        <Image style={{ width: 12, height: 12 }} source={icons.sendPostcard} />
        <Text style={{ fontSize: 14, opacity: 0.4 }}>35</Text>
      </T.NextButton>
    </T.Wrapper>
  );
};

export default StepThird;
