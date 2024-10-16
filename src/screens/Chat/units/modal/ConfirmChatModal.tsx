import * as S from './ChatModal.style';
import { colors } from '@commons/styles/variablesStyles';
import { View } from 'react-native';

interface IProps {
  sendMemberName: string;
  report: () => void;
  chatDeny: () => void;
  chatAccept: () => void;
}

export const ConfirmChatModal = ({ sendMemberName, report, chatAccept, chatDeny }: IProps) => {
  return (
    <S.Wrapper>
      <S.TextWrapper>
        <S.TitleText>{sendMemberName}님의 매칭 요청을 수락하시겠어요?</S.TitleText>
        <S.Text>{`수락하면 책갈피 30개가 사용되며 채팅이 시작됩니다.\n채팅이 시작되면 받은 엽서 목록에서 사라지며 채팅방으로 이동됩니다\n엽서를 받고 3일동안 응답하지 않으면 자동으로 거절됩니다.`}</S.Text>
      </S.TextWrapper>

      <S.ButtonListWrapper>
        <S.Button borderColor="#FFFFFF" backgroundColor="transparent" onPress={report}>
          <S.ButtonText color="white">신고</S.ButtonText>
        </S.Button>
        <View style={{ flex: 1 }} />
        <S.Button borderColor="#FFFFFF" backgroundColor="transparent" onPress={chatDeny}>
          <S.ButtonText color="white">거절</S.ButtonText>
        </S.Button>
        <View style={{ flex: 1 }} />
        <S.Button borderColor={colors.primary02} backgroundColor={colors.primary02} onPress={chatAccept}>
          <S.ButtonText color="black">수락</S.ButtonText>
        </S.Button>
      </S.ButtonListWrapper>
    </S.Wrapper>
  );
};
