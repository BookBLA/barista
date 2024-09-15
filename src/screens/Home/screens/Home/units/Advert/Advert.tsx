import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './Advert.styles';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';
import { useEffect, useState } from 'react';

const Advert = () => {
  // TODO: 실제 빌드 시 광고단위 id 적용
  // const adUnitId = __DEV__ ? TestIds.REWARDED : 'ca-app-pub-xxxxxxxxxxxxx/yyyyyyyyyyyyyy';
  const adUnitId = TestIds.REWARDED;
  const rewarded = RewardedAd.createForAdRequest(adUnitId);

  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(RewardedAdEventType.LOADED, () => {
      setLoaded(true);
    });
    const unsubscribeEarned = rewarded.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log('User earned reward of ', reward);
    });

    // Start loading the rewarded ad straight away
    rewarded.load();

    // Unsubscribe from events on unmount
    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
    };
  }, []);

  // No advert ready to show yet
  // if (!loaded) {
  //   return null;
  // }

  // TODO: 최초 1회는 새로운 사람 리로드, 두번째 세번째 시행은 리워드 광고 시청 후 새로운 사람 리로드
  return (
    <S.Wrapper>
      <S.Button
        onPress={() => {
          rewarded.show();
        }}
      >
        <S.RefreshWrapper>
          <S.RefreshImage source={icons.refresh} />
        </S.RefreshWrapper>
        <CustomText color="#fff">새로운 사람 만나기</CustomText>
      </S.Button>
    </S.Wrapper>
  );
};

export default Advert;
