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
import { IProps, ISettingData } from './Setting.types';
import { agreementMainUrl, noticeUrl } from '../../../../commons/contents/agreement/agreementUrls';
import { getAppVersion } from '../../../../commons/utils/getAppVersion';
import { getVersionApi } from '../../../../commons/api/setting.api';
import { useEffect, useState } from 'react';
import { CustomButton } from '../../../../commons/components/CustomButton/CustomButton';
import { Platform } from 'react-native';

const initState = {
  version: '',
  googlePlayStoreUrl: '',
  appStoreUrl: '',
};

const Setting = ({ route }: IProps) => {
  const { age, name, school, profileImageUrl } = route.params;
  const { movePage, handleReset } = useMovePage();
  const { toggle, isOpen } = useToggle();
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
  };

  useEffect(() => {
    getLatestVersion();
  }, []);

  const onClickUpdateMove = () => {
    const url = Platform.OS === 'ios' ? data.appStoreUrl : data.googlePlayStoreUrl;
    handleLinkPress(url);
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
          <CustomText margin="16px 0" onPress={handleLinkPress(agreementMainUrl)}>
            약관 및 정책
          </CustomText>
          <CustomText margin="16px 0" onPress={handleLinkPress(noticeUrl)}>
            이벤트 및 공지사항
          </CustomText>
          <S.BetweenWrapper>
            <S.RowWrapper>
              <CustomText margin="16px 5px 0 0">현재 버전</CustomText>
              <CustomText margin="16px 5px 0 0" color={colors.textGray2}>
                {`V${appVersion}`}
              </CustomText>
            </S.RowWrapper>
            {data.version === appVersion ? (
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
    </>
  );
};

export default Setting;
