import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Advert.styles';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { getReloadAdmobCount, postReloadAdmobUse } from '@commons/api/admob/reloadAdmob.api';

const Advert = () => {
  const [admobCount, setAdmobCount] = useState<number>(0);

  const advertiseUnitJson = JSON.parse(`${process.env.EXPO_PUBLIC_GOOGLE_ADMOB_ADVERTISE_UNIT}`);
  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : Platform.OS === 'ios'
      ? advertiseUnitJson.ios.reload_new_person
      : advertiseUnitJson.android.reload_new_person;

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loaded, setLoaded] = useState<boolean>(false);
  console.log('admobCount', admobCount);

  useEffect(() => {
    try {
      getReloadAdmobCount('NEWPERSON').then((res) => {
        setAdmobCount(res ?? 0);
      });
    } catch (error) {
      console.error(error);
    }

    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('Ad loaded');
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of ', reward);
      // TODO: 다른 상대방 불러오는 보상 부여하는 로직 추가
      if (admobCount > 0) rewarded.load();
    });
    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  const handleGetRewardedAds = async () => {
    if (loaded) {
      try {
        rewarded.show();
        postReloadAdmobUse('NEWPERSON').then((res) => {
          setAdmobCount(res ?? 0);
        });
      } catch {
        rewarded.load();
      }
    } else {
      console.log('Ad is not loaded yet, loading ad...');
      rewarded.load();
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
          <CustomText color="#fff">광고 시청 후 새로운 사람 만나기  {admobCount}/2</CustomText>
        </S.Button>
      )}
    </S.Wrapper>
  );
};

export default Advert;
