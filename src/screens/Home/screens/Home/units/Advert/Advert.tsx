import { getReloadAdmobCount, postReloadAdmobUse } from '@commons/api/admob/reloadAdmob.api';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { useEffect, useState } from 'react';
import { postMembersMatchRefresh } from '@commons/api/members/match/memberMatch';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import * as S from './Advert.styles';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import { AxiosError } from 'axios';

const Advert = ({ memberData, handleRefresh }: { memberData: MemberIntroResponse; handleRefresh: () => void }) => {
  const showToast = useToastStore((state) => state.showToast);
  const [admobCount, setAdmobCount] = useState<number>(0);

  useEffect(() => {
    getAdmobCount();
  }, []);

  const getAdmobCount = async () => {
    getReloadAdmobCount().then((res) => {
      setAdmobCount(res.newPersonAdmobCount ?? 0);
    });
  };

  const reloadAdmobCount = async () => {
    postReloadAdmobUse('NEW_PERSON');
  };

  const refreshNewPerson = async () => {
    try {
      await postMembersMatchRefresh({
        refreshMemberId: memberData.memberId,
        refreshMemberBookId: memberData.memberBookId,
      });
      await reloadAdmobCount();
      await new Promise((resolve) => setTimeout(resolve, 200));
      await getAdmobCount();
      handleRefresh();
    } catch (error) {
      const { response } = error as unknown as AxiosError<AxiosError>;
      if (response) {
        // console.log(response.data, response.status);
        showToast({
          content: response.data.message,
        });
      }
    }
  };

  // // 광고 시청 후 새로운 사람 만나기 로직
  // const [admobCount, setAdmobCount] = useState<number>(0);
  //
  // const advertiseUnitJson = JSON.parse(`${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_ADVERTISE_UNIT}`);
  // const platform =
  //   Platform.OS === 'ios' ? advertiseUnitJson.ios.reload_new_person : advertiseUnitJson.android.reload_new_person;
  // const adUnitId = platform === 'test' ? TestIds.REWARDED : platform;
  // console.log(adUnitId);
  //
  // const rewarded = RewardedAd.createForAdRequest(adUnitId, {
  //   requestNonPersonalizedAdsOnly: true,
  // });
  // const [loaded, setLoaded] = useState<boolean>(false);
  //
  // useEffect(() => {
  //   const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
  //     setLoaded(true);
  //     console.log('Ad loaded');
  //   });
  //
  //   const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
  //     console.log('User earned reward of ', reward);
  //     postReloadAdmobUse('NEW_PERSON').then((res) => {
  //       setAdmobCount(res.newPersonAdmobCount ?? 0);
  //     });
  //     postMembersMatchRefresh({
  //       refreshMemberId: memberData.memberId,
  //       refreshMemberBookId: memberData.memberBookId,
  //     }).then((result) => {
  //       console.log(result);
  //     });
  //   });
  //   getAdmobCount();
  //   rewarded.load();
  //
  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeEarned();
  //   };
  // }, [rewarded]);
  //
  // const getAdmobCount = async () => {
  //   try {
  //     getReloadAdmobCount().then((res) => {
  //       setAdmobCount(res.newPersonAdmobCount ?? 0);
  //     });
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  //
  // const handleGetRewardedAds = async () => {
  //   if (loaded) {
  //     try {
  //       rewarded.show();
  //     } catch {
  //       rewarded.load();
  //       showToast({
  //         content: '광고가 로딩중입니다.',
  //       });
  //     }
  //   } else {
  //     console.log('Ad is not loaded yet, loading ad...');
  //   }
  // };

  return (
    <S.Wrapper>
      <S.Button onPress={refreshNewPerson} style={{ opacity: admobCount > 0 ? 1 : 0.4 }} disabled={admobCount <= 0}>
        <S.RefreshWrapper>
          <S.RefreshImage source={icons.refresh} />
        </S.RefreshWrapper>
        <CustomText color="#fff">새로운 사람 만나기 {admobCount}/3</CustomText>
      </S.Button>
    </S.Wrapper>
  );
};

export default Advert;
