import * as S from './GroupChannelListEmpty.style';
import { img } from '@commons/utils/ui/variablesImages/variablesImages';
import { View } from 'react-native';

export const GroupChannelListEmpty = () => {
  return (
    <S.Wrapper>
      <S.ContentWrapper>
        <S.EmptyListImage source={img.emptyAlert} />
        <View style={{ height: 20 }} />
        <S.EmptyListText>{'아직 진행 중인 대화가 없어요.\n엽서를 보내 대화를 시작해보세요'}</S.EmptyListText>
      </S.ContentWrapper>
    </S.Wrapper>
  );
};
