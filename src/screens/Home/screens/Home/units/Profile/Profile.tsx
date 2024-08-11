import * as S from './Profile.styles';
import useMovePage from '../../../../../../commons/hooks/navigations/movePage/useMovePage';
import { CustomText } from '../../../../../../commons/components/Utils/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IDdata } from '../../../../HomeStack.types';
import { icons } from '../../../../../../commons/utils/ui/variablesImages/variablesImages';
import truncateText from '../../../../../../commons/utils/ui/truncateText/truncateText';

const Profile = ({ item }: { item: IDdata }) => {
  const { memberId, bookName, memberName, memberSchoolName, memberAge, bookImageUrl } = item;
  const { movePage } = useMovePage();

  return (
    <S.ProfileWrapper onPress={movePage('library', { memberId, isYourLibrary: true })}>
      <S.BookImageWrapper>
        <S.BookImage source={bookImageUrl ? { uri: bookImageUrl } : icons.bookCover} />
      </S.BookImageWrapper>
      <CustomText size="12px">{truncateText(bookName, 15)}</CustomText>
      <CustomText size="10px">{`${memberName} (${memberAge ?? '0'}살)`}</CustomText>
      <CustomText size="10px" color={colors.textGray}>
        {memberSchoolName ?? '?? 대학교'}
      </CustomText>
    </S.ProfileWrapper>
  );
};

export default Profile;
