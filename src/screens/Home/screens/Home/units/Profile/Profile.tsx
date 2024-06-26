import * as S from './Profile.styles';
import useMovePage from '../../../../../../commons/hooks/useMovePage';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IDdata } from '../../../../HomeStack.types';
import { icons } from '../../../../../../commons/utils/variablesImages';
import truncateText from '../../../../../../commons/utils/truncateText';

const Profile = ({ item }: { item: IDdata }) => {
  const { movePage } = useMovePage();
  const modifiedName = item?.memberName ? `${item.memberName.charAt(0)}0${item.memberName.slice(2)}` : '닉네임';

  return (
    <S.ProfileWrapper onPress={movePage('library', { memberId: item?.memberId, isYourLibrary: true })}>
      <S.BookImageWrapper>
        <S.BookImage source={item.bookImageUrl ? { uri: item.bookImageUrl } : icons.bookCover} />
      </S.BookImageWrapper>
      <CustomText size="12px">{truncateText(item.bookName, 15)}</CustomText>
      <CustomText size="10px">{`${modifiedName} (${item?.memberAge ?? '0'}살)`}</CustomText>
      <CustomText size="10px" color={colors.textGray}>
        {item?.memberSchoolName ?? '?? 대학교'}
      </CustomText>
    </S.ProfileWrapper>
  );
};

export default Profile;
