import { background } from '@commons/utils/ui/variablesImages/variablesImages';
import * as S from './EventCard.style';

const EventCard = () => {
  return (
    <S.Wrapper>
      <S.BackgroundImage source={background.eventCard} />
    </S.Wrapper>
  );
};

export default EventCard;
