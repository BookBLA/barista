import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Advert.styles';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { getReloadAdmobCount, postReloadAdmobUse } from '@commons/api/admob/reloadAdmob.api';
import { number } from 'yup';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import { MemberIntroResponse } from '@commons/types/openapiGenerator';
import { postMembersMatchRefresh } from '@commons/api/members/match/memberMatch';

const Advert = ({ memberData }: { memberData: MemberIntroResponse }) => {
  const showToast = useToastStore((state) => state.showToast);

  const [admobCount, setAdmobCount] = useState<number>(0);

  const advertiseUnitJson = JSON.parse(`${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_ADVERTISE_UNIT}`);
  const platform =
    Platform.OS === 'ios' ? advertiseUnitJson.ios.reload_new_person : advertiseUnitJson.android.reload_new_person;
  const adUnitId = platform === 'test' ? TestIds.REWARDED : platform;
  console.log(adUnitId);

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  console.log('admobCount', admobCount);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('Ad loaded');
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of ', reward);
      postReloadAdmobUse('NEW_PERSON').then((res) => {
        setAdmobCount(res.newPersonAdmobCount ?? 0);
      });
      // TODO: 다른 상대방 불러오는 보상 부여하는 로직 추가
      postMembersMatchRefresh({
        refreshMemberId: memberData.memberId,
        refreshMemberBookId: memberData.memberBookId,
      }).then((result) => {
        console.log(result);
      });
    });
    getAdmobCount();
    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, [rewarded]);

  const getAdmobCount = async () => {
    try {
      getReloadAdmobCount().then((res) => {
        setAdmobCount(res.newPersonAdmobCount ?? 0);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleGetRewardedAds = async () => {
    if (loaded) {
      try {
        rewarded.show();
      } catch {
        rewarded.load();
        showToast({
          content: '광고가 로딩중입니다.',
        });
      }
    } else {
      console.log('Ad is not loaded yet, loading ad...');
    }
  };

  return (
    <S.Wrapper>
      {/* 새로운 사람 만나기 1번 한지 체크 */}
      {false ? (
        <S.Button onPress={() => console.log('새로운 사람 만니기')}>
          <S.RefreshWrapper>
            <S.RefreshImage source={icons.refresh} />
          </S.RefreshWrapper>
          <CustomText color="#fff">새로운 사람 만나기</CustomText>
        </S.Button>
      ) : (
        <S.Button onPress={handleGetRewardedAds} style={{ opacity: admobCount > 0 ? 1 : 0.4}} disabled={admobCount <= 0}>
          <S.RefreshWrapper>
            <S.RefreshImage source={icons.refresh} />
          </S.RefreshWrapper>
          <CustomText color="#fff">광고 시청 후 새로운 사람 만나기 {admobCount}/2</CustomText>
        </S.Button>
      )}
    </S.Wrapper>
  );
};

export default Advert;
