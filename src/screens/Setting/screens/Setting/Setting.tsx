import Library from '@assets/images/icons/LibraryTransparent.png';
import Matching from '@assets/images/icons/MatchingTransparent.png';
import Support from '@assets/images/icons/SupportTransparent.png';
import { CustomModal } from '@commons/components/Feedbacks/CustomModal/CustomModal';
import { CustomButton } from '@commons/components/Inputs/CustomButton/CustomButton';
import { CustomSwitch } from '@commons/components/Inputs/CustomSwitch/CustomSwitch';
import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import { LightText } from '@commons/components/Utils/TextComponents/LightText/LightText';
import { agreementMainUrl, noticeUrl } from '@commons/contents/agreement/agreementUrls';
import useScreenLogger from '@commons/hooks/analytics/analyticsScreenLogger/useAnalyticsScreenLogger';
import { useLinkingOpen } from '@commons/hooks/navigations/linkingOpen/useLinkingOpen';
import useMovePage from '@commons/hooks/navigations/movePage/useMovePage';
import useHeaderControl from '@commons/hooks/ui/headerControl/useHeaderControl';
import { useToggle } from '@commons/hooks/utils/toggle/useToggle';
import { colors } from '@commons/styles/variablesStyles';
import { getAppVersion } from '@commons/utils/data/getAppVersion/getAppVersion';
import { useRoute } from '@react-navigation/native';
import * as S from '@screens/Setting/SettingStack.styles';
import { useState } from 'react';
import { ActivityIndicator, Platform } from 'react-native';
import { getLinkModalConfig } from './configs/linkModalConfig';
import { useGetLatestVersion } from './hooks/useGetLatestVersion';
import { TProps } from './Setting.types';

const Setting = () => {
  useScreenLogger();
  const [link, setLink] = useState('');
  const route = useRoute<TProps>();
  const { age, name, school, profileImageUrl } = route.params;
  const { movePage, handleReset } = useMovePage();
  const outerLinkModal = useToggle();
  const handleLinkPress = useLinkingOpen();
  const appVersion = getAppVersion();
  const { data, loading } = useGetLatestVersion();
  useHeaderControl({
    title: '설정',
  });

  const onClickUpdateMove = () => {
    const url = Platform.OS === 'ios' ? data?.appStoreUrl : data?.googlePlayStoreUrl;
    handleLinkPress(url)();
  };

  const hanldeOuterLinkModal = (url: string) => {
    setLink(url);
    outerLinkModal.toggle();
  };

  const handleMoveOuterLink = () => {
    handleLinkPress(link)();
    outerLinkModal.toggle();
  };

  const linkModalConfig = getLinkModalConfig(outerLinkModal, handleMoveOuterLink);

  return (
    <>
      <S.Wrapper>
        <S.ProfileWrapper>
          <S.LeftWrapper>
            <S.ProfileImage
              source={{
                uri: profileImageUrl,
              }}
            />
          </S.LeftWrapper>
          <S.RightWrapper>
            <CustomText>{`${name ?? '닉네임을 등록해 주세요.'} | ${age ?? 0}살`}</CustomText>
            <LightText>{school}</LightText>
          </S.RightWrapper>
        </S.ProfileWrapper>
        <S.MenuWrapper>
          <S.MenuButton onPress={() => handleReset('tapScreens', { screen: 'Library' })}>
            <S.MenuImage source={Library} />
            <CustomText color={colors.primary} size="14px">
              내 서재
            </CustomText>
          </S.MenuButton>
          <S.MenuButton onPress={() => handleReset('tapScreens', { screen: 'Matching' })}>
            <S.MenuImage source={Matching} />
            <CustomText color={colors.primary} size="14px">
              매칭
            </CustomText>
          </S.MenuButton>
          <S.MenuButton onPress={handleLinkPress(noticeUrl)}>
            <S.MenuImage source={Support} />
            <CustomText color={colors.primary} size="14px">
              고객센터
            </CustomText>
          </S.MenuButton>
        </S.MenuWrapper>
        <S.Line />
        <S.BottomWrapper>
          <CustomText onPress={movePage('account')} margin="16px 0">
            계정
          </CustomText>
          <CustomText margin="16px 0" onPress={() => hanldeOuterLinkModal(agreementMainUrl)}>
            약관 및 정책
          </CustomText>
          <S.BetweenWrapper>
            <S.RowWrapper>
              <CustomText margin="16px 0">알림 켜기</CustomText>
              <CustomText margin="20px 0px 0 4px" color={colors.textGray2} size="12px">
                알림을 끄시면 매칭 확인이 어려워요!
              </CustomText>
            </S.RowWrapper>
            <CustomSwitch value onValueChange={() => false} />
          </S.BetweenWrapper>
          <CustomText margin="16px 0" onPress={() => hanldeOuterLinkModal(noticeUrl)}>
            이벤트 및 공지사항
          </CustomText>
          <S.BetweenWrapper>
            <S.RowWrapper>
              <CustomText margin="16px 5px 0 0">현재 버전</CustomText>
              <CustomText margin="16px 5px 0 0" color={colors.textGray2}>
                {`V${appVersion}`}
              </CustomText>
            </S.RowWrapper>
            {loading ? (
              <ActivityIndicator size="small" color={colors.primary} />
            ) : data?.version === appVersion ? (
              <CustomText margin="20px 4px 0 0" color={colors.textGray2} size="12px">
                최신 버전
              </CustomText>
            ) : (
              <CustomButton contents="업데이트" padding="8px 12px" onPress={onClickUpdateMove} />
            )}
          </S.BetweenWrapper>
        </S.BottomWrapper>
      </S.Wrapper>
      <CustomModal modalConfig={linkModalConfig} />
    </>
  );
};

export default Setting;
