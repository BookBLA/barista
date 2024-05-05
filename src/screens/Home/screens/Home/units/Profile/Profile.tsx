import * as S from './Profile.styles';
import useMovePage from '../../../../../../commons/hooks/useMovePage';
import { CustomText } from '../../../../../../commons/components/TextComponents/CustomText/CustomText';
import { colors } from '../../../../../../commons/styles/variablesStyles';
import { IDdata } from '../../../../HomeStack.types';
import { icons } from '../../../../../../commons/utils/variablesImages';

const Profile = ({ item }: { item: IDdata }) => {
  const { movePage } = useMovePage();
  const modifiedName = item?.memberName ? `${item.memberName.charAt(0)}0${item.memberName.slice(2)}` : '이름';
  const bookName = item?.bookName ? item.bookName.substring(0, 12).padEnd(15, '...') : '책';

  return (
    <S.ProfileWrapper onPress={movePage('OtherLibrary', { userId: item?.memberId, isYourLibrary: true })}>
      <S.BookImage source={item.bookImageUrl ? { uri: item.bookImageUrl } : icons.bookCover} />
      <CustomText size="12px">{bookName}</CustomText>
      <CustomText size="10px">{`${modifiedName} (${item?.memberAge ?? '0'}살)`}</CustomText>
      <CustomText size="10px" color={colors.textGray}>
        {item?.memberSchoolName ?? '?? 대학교'}
      </CustomText>
    </S.ProfileWrapper>
  );
};

export default Profile;
