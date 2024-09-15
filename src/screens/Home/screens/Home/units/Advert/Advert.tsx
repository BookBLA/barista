import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Advert.styles';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';
import { Platform } from 'react-native';
import { getReloadAdmobCount, postReloadAdmobUse } from '@commons/api/admob/reloadAdmob.api';

let admobCount: 0;
getReloadAdmobCount().then((res) => {
  admobCount = res;
});

const Advert = () => {
  const advertiseUnitJson = require('google_admob_advertise_unit.json');
  const adUnitId = __DEV__
    ? TestIds.REWARDED
    : Platform.OS === 'ios'
      ? advertiseUnitJson.ios.reload_new_person
      : advertiseUnitJson.android.reload_new_person;
  // const adUnitId =
  //   Platform.OS === 'android' ? advertiseUnitJson.ios.reload_new_person : advertiseUnitJson.android.reload_new_person;
  // console.log(adUnitId);

  const rewarded = RewardedAd.createForAdRequest(adUnitId, {
    requestNonPersonalizedAdsOnly: true,
  });
  const [loaded, setLoaded] = useState(false);
  console.log('admobCount', admobCount);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
      console.log('Ad loaded');
    });

    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of ', reward);
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
        postReloadAdmobUse();
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
      <S.Button onPress={admobCount ? handleGetRewardedAds : null}>
        <S.RefreshWrapper>
          <S.RefreshImage source={icons.refresh} />
        </S.RefreshWrapper>
        <CustomText color="#fff">새로운 사람 만나기</CustomText>
      </S.Button>
    </S.Wrapper>
  );
};

export default Advert;
