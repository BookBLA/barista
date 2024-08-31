import { CustomText } from '@commons/components/Utils/TextComponents/CustomText/CustomText';
import BookImage from '../BookImage/BookImage';
import BookInfo from '../BookInfo/BookInfo';
import Profile from '../Profile/Profile';
import * as S from './MemberCard.styles';

const MemberCard = () => {
  return (
    <S.Wrapper>
      <Profile />
      <BookImage />
      <BookInfo />

      <S.SendButton>
        <CustomText>엽서 보내기</CustomText>
      </S.SendButton>
    </S.Wrapper>
  );
};

export default MemberCard;
