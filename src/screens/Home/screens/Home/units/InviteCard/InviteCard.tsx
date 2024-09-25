import { LightText } from '@commons/components/Utils/TextComponents/LightText/LightText';
import { background, icons } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './InviteCard.styles';
import { useEffect, useState } from 'react';
import { getInviteCodeApi } from '@commons/api/invitation/invitation.api';
import { ResponseData } from '@commons/types/responseData';
import { View } from 'react-native';
import useToastStore from '@commons/store/ui/toast/useToastStore';
import * as Clipboard from 'expo-clipboard';

const InviteCard = () => {
  const showToast = useToastStore((state) => state.showToast);

  const [invitationCode, setInvitationCode] = useState<string>('');
  useEffect(() => {
    getInviteCodeApi().then((res: ResponseData<any>) => {
      setInvitationCode(res.result.invitationCode);
    });
  }, []);

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(invitationCode);
    showToast({
      content: '코드가 복사되었습니다',
    });
  };

  return (
    <S.Wrapper>
      <S.TopWrapper>
        <S.TopImage source={background.inviteCard} resizeMode="contain" />
      </S.TopWrapper>
      <S.BottomWrapper>
        <S.ButtonWrapper>
          <S.ButtonText>나의 초대 코드</S.ButtonText>
          <View style={{ height: 6 }} />
          <S.SaveWrapper onPress={copyToClipboard}>
            <S.SaveCodeText>{invitationCode}</S.SaveCodeText>
            <S.SaveImageWrapper>
              <S.SaveImage source={icons.save} />
            </S.SaveImageWrapper>
          </S.SaveWrapper>
        </S.ButtonWrapper>
        <LightText size="10px" margin="0 0 2px">
          • 횟수 제한 없이 친구초대에 성공할 때마다 보상을 받아요.
        </LightText>
        <LightText size="10px" margin="0 0 2px">
          • 친구를 초대한 나, 초대받고 가입한 친구 둘 다 보상을 받을 수 있어요.
        </LightText>
        <LightText size="10px" margin="0 0 2px">
          • 초대받은 친구가 북블라에 최초 가입한 경우 제공되며, 여성인 경우 70개 남성인 경우 35개의 책갈피를 보상을 받을
          수 있어요.
        </LightText>
        <LightText size="10px" margin="0 0 2px">
          • 기존 가입자, 재가입자를 초대한 경우 보상을 받을 수 없어요.
        </LightText>
        <LightText size="10px">
          • 부정한 방법으로 이벤트에 참여할 경우 보상지급 취소 및 계정이용에 제한이 생길 수 있어요.
        </LightText>
      </S.BottomWrapper>
    </S.Wrapper>
  );
};

export default InviteCard;
