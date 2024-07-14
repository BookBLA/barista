import { CustomText } from '../../../../commons/components/TextComponents/CustomText/CustomText';
import { LightText } from '../../../../commons/components/TextComponents/LightText/LightText';
import { colors } from '../../../../commons/styles/variablesStyles';
import { useToggle } from '../../../../commons/hooks/useToggle';
import { CustomModal } from '../../../../commons/components/CustomModal/CustomModal';
import { useLinkingOpen } from '../../../../commons/hooks/useLinkingOpen';
import * as S from '../../SettingStack.styles';
import Matching from '../../../../../assets/images/icons/MatchingTransparent.png';
import Support from '../../../../../assets/images/icons/SupportTransparent.png';
import Library from '../../../../../assets/images/icons/LibraryTransparent.png';
import useMovePage from '../../../../commons/hooks/useMovePage';
import useHeaderControl from '../../../../commons/hooks/useHeaderControl';
import ModalContent from './units/ModalContent/ModalContent';
import { ISettingData, TProps } from './Setting.types';
import { agreementMainUrl, noticeUrl } from '../../../../commons/contents/agreement/agreementUrls';
import { getAppVersion } from '../../../../commons/utils/getAppVersion';
import { getVersionApi } from '../../../../commons/api/setting.api';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import { ActivityIndicator, Platform } from 'react-native';
import OuterLinkModalContent from './units/ModalContent/OuterLinkModalContent';
import { useRoute } from '@react-navigation/native';
import useScreenLogger from '../../../../commons/hooks/useAnalyticsScreenLogger';
import { Switch } from 'react-native-switch';

const initState = {
  version: '',
  googlePlayStoreUrl: '',
  appStoreUrl: '',
};

const Setting = () => {
  useScreenLogger();
  const [link, setLink] = useState('');
  const [loading, setLoading] = useState(true);
  const route = useRoute<TProps>();
  const { age, name, school, profileImageUrl } = route.params;
  const { movePage, handleReset } = useMovePage();
  const { toggle, isOpen } = useToggle();
  const outerLinkModal = useToggle();
  const handleLinkPress = useLinkingOpen();
  const [data, setData] = useState<ISettingData>(initState);
  const appVersion = getAppVersion();
  useHeaderControl({
    title: '설정',
  });
  const getLatestVersion = async () => {
    const { result } = await getVersionApi();
    const { version, googlePlayStoreUrl, appStoreUrl } = result;
    setData({
      version,
      googlePlayStoreUrl,
      appStoreUrl,
    });
    setLoading(false);
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  const onClickUpdateMove = () => {
    const url = Platform.OS === 'ios' ? data.appStoreUrl : data.googlePlayStoreUrl;
    handleLinkPress(url);
  };

  const hanldeOuterLinkModal = (url: string) => {
    setLink(url);
    outerLinkModal.toggle();
  };

  const handleMoveOuterLink = () => {
    handleLinkPress(link)();
    outerLinkModal.toggle();
  };

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
            <CustomText color={colors.primary}>내 서재</CustomText>
          </S.MenuButton>
          <S.MenuButton onPress={() => handleReset('tapScreens', { screen: 'Matching' })}>
            <S.MenuImage source={Matching} />
            <CustomText color={colors.primary}>매칭</CustomText>
          </S.MenuButton>
          <S.MenuButton onPress={handleLinkPress(noticeUrl)}>
            <S.MenuImage source={Support} />
            <CustomText color={colors.primary}>고객센터</CustomText>
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
            <Switch
              value
              // onValueChange={}
              circleSize={16}
              barHeight={20}
              circleBorderWidth={0}
              backgroundActive={colors.primary}
              backgroundInactive={colors.buttonAuthToggle}
              circleActiveColor="#fff"
              circleInActiveColor="#fff"
              renderActiveText={false}
              renderInActiveText={false}
              switchLeftPx={3}
              switchRightPx={3}
              switchWidthMultiplier={2}
            />
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
      <CustomModal
        modalConfig={{
          visible: isOpen,
          onClose: toggle,
          mode: 'round',
          contents: <ModalContent />,
          buttons: [
            { label: '취소', action: toggle, bgColor: colors.buttonMain, color: 'black' },
            { label: '설정', action: toggle },
          ],
        }}
      />
      <CustomModal
        modalConfig={{
          visible: outerLinkModal.isOpen,
          onClose: outerLinkModal.toggle,
          mode: 'round',
          contents: <OuterLinkModalContent />,
          buttons: [
            { label: '돌아가기', action: outerLinkModal.toggle, bgColor: colors.buttonMain, color: 'black' },
            { label: '이동하기', action: handleMoveOuterLink },
          ],
        }}
      />
    </>
  );
};

export default Setting;
